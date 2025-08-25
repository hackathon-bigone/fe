import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as E from "../styles/StyledScan";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io";

async function pollReceiptJob({ token, jobId, signal }) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const maxAttempts = 30;
  let attempt = 0;

  const headers = { Authorization: `Bearer ${token}` };
  const candidates = [
    `/foodbox/receipt/${jobId}`,
    `/foodbox/receipt/result/${jobId}`,
    `/foodbox/receipt/status/${jobId}`,
    `/foodbox/receipt?jobId=${encodeURIComponent(jobId)}`,
  ];

  const getAny = async (url) =>
    axios.get(`${API_BASE}${url}`, {
      headers,
      timeout: 30000,
      signal,
      validateStatus: () => true,
    });

  while (attempt < maxAttempts) {
    for (const url of candidates) {
      const resp = await getAny(url);
      const { status, data } = resp;

      if (status >= 200 && status < 300) {
        const s = String(data?.status || "").toUpperCase();
        if (s === "DONE" || s === "SUCCESS") {
          if (Array.isArray(data?.items)) return data.items;
          if (Array.isArray(data?.result)) return data.result;
          return [];
        }

        if (Array.isArray(data) || Array.isArray(data?.items)) {
          return Array.isArray(data) ? data : data.items;
        }
      }

      if ([404, 202, 204, 425, 500].includes(status)) {
        continue;
      }

      if (status === 401 || status === 403) {
        throw new Error("인증이 만료되었거나 권한이 없습니다.");
      }
    }

    await sleep(Math.min(1000 * Math.pow(1.25, attempt), 5000));
    attempt += 1;
  }

  throw new Error("인식 대기 시간이 초과되었습니다.");
}

const Scan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const file = state?.file;
  const previewUrl = state?.previewUrl;

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!file) {
      navigate("/refrigerator/ingredients/receipt", { replace: true });
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      const token = localStorage.getItem("access_token");

      try {
        if (!token) throw new Error("로그인이 필요합니다.");

        const form = new FormData();
        form.append("file", file);

        const { data } = await axios.post(
          `${API_BASE}/foodbox/receipt/upload`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            timeout: 60000,
            signal: controller.signal,
          }
        );

        // ✅ jobId가 있으면 polling
        if (data?.jobId) {
          const items = await pollReceiptJob({
            token,
            jobId: data.jobId,
            signal: controller.signal,
          });

          navigate("/refrigerator/ingredients/receipt/scan/complete", {
            state: { items, previewUrl },
            replace: true,
          });
          return;
        }

        // ✅ 바로 items가 오는 경우
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];

        navigate("/refrigerator/ingredients/receipt/scan/complete", {
          state: { items, previewUrl },
          replace: true,
        });
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log("스캔 요청이 취소됨");
        } else {
          console.error("스캔 실패:", e);
          // ❌ 사용자에겐 에러 노출하지 않음
        }
      }
    };

    run();

    return () => controller.abort();
  }, [file, previewUrl, navigate]);

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
      </E.Header>
      <E.Body>
        <img src={`${process.env.PUBLIC_URL}/images/scanning.gif`} alt="scan" />
        <div id="detail">영수증 스캔 중... </div>
      </E.Body>
    </E.Container>
  );
};

export default Scan;
