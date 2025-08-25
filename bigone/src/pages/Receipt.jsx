import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledReceipt";
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

      console.debug(`[poll ${attempt}] ${status} ${url}`, data);

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

      if ([404, 202, 204, 425, 500].includes(status)) continue;
      if (status === 401 || status === 403) {
        throw new Error("인증이 만료되었거나 권한이 없습니다.");
      }
    }

    await sleep(Math.min(1000 * Math.pow(1.25, attempt), 5000));
    attempt += 1;
  }

  throw new Error("인식 대기 시간이 초과되었습니다.");
}

async function startReceiptScanWorkflow({
  file,
  previewUrl,
  token,
  navigate,
  signal,
}) {
  const form = new FormData();
  form.append("file", file);

  const uploadOnce = () =>
    axios.post(`${API_BASE}/foodbox/receipt/upload`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Prefer: "respond-async",
      },
      timeout: 60000,
      signal,
    });

  let res;
  try {
    res = await uploadOnce(true);
  } catch (e) {
    console.error("🔴 첫 요청 실패:", e?.response?.data || e.message);
    if (!e.response || e.response.status === 0) {
      res = await uploadOnce(false);
    } else {
      throw e;
    }
  }

  const data = res?.data;

  if (data?.jobId) {
    const items = await pollReceiptJob({ token, jobId: data.jobId, signal });
    navigate("/refrigerator/ingredients/receipt/scan/complete", {
      state: { items, previewUrl },
      replace: true,
    });
    return;
  }

  if (Array.isArray(data) || Array.isArray(data?.items)) {
    const items = Array.isArray(data) ? data : data.items;
    navigate("/refrigerator/ingredients/receipt/scan/complete", {
      state: { items, previewUrl },
      replace: true,
    });
    return;
  }

  throw new Error("업로드 응답 형식을 해석할 수 없습니다.");
}

const Receipt = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const goBack = () => navigate(-1);
  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 20 * 1024 * 1024) {
      alert("파일 최대 20MB 입니다.");
      e.target.value = "";
      return;
    }
    setFile(f);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(f);
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onClickScan = () => {
    if (!file) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("로그인이 필요합니다. 다시 로그인해 주세요.");
      return;
    }

    startReceiptScanWorkflow({
      file,
      previewUrl,
      token,
      navigate,
      signal: undefined,
    }).catch((err) => {
      console.error("스캔 실패:", err);
      navigate("/refrigerator/ingredients/receipt/scan/complete", {
        state: {
          items: [],
          previewUrl,
          error: err?.message || "스캔 실패",
        },
        replace: true,
      });
    });

    navigate("/refrigerator/ingredients/receipt/scan", {
      state: { previewUrl, file },
    });
  };

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <div>영수증 인식</div>
      </E.Header>
      <E.Body>
        <E.Title>영수증 첨부</E.Title>
        <E.Image onClick={handleImageClick} isUploaded={!!previewUrl}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="영수증 미리보기"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <E.PlusIcon>
                <img
                  src={`${process.env.PUBLIC_URL}/images/Plus.svg`}
                  alt="plus"
                />
              </E.PlusIcon>
              <E.ImageText>
                영수증 이미지 파일을
                <br />
                첨부해 주세요.
              </E.ImageText>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </E.Image>
        <E.Button disabled={!file} onClick={onClickScan}>
          스캔하기
        </E.Button>
      </E.Body>
    </E.Container>
  );
};

export default Receipt;
