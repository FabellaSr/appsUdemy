import { useMemo, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface ProviderQrProps {
  /** ID del proveedor. Se combina con VITE_PUBLIC_BASE_URL para armar la URL. */
  providerId?: string;
  /** URL completa ya armada. Tiene prioridad sobre providerId. */
  fullUrl?: string;
  /** Tamaño del QR en px. */
  size?: number;
  /** Texto del archivo descargado (sin extensión). */
  fileName?: string;
  className?: string;
}

/**
 * Resuelve la URL pública del proveedor.
 * Prioridad: fullUrl > VITE_PUBLIC_BASE_URL + /providers/{id} > window.location.origin + /providers/{id}
 */
function resolveProviderUrl(providerId?: string, fullUrl?: string): string {
  if (fullUrl) return fullUrl;

  const envBase = (import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined)?.replace(/\/$/, "");
  const base =
    envBase ?? (typeof window !== "undefined" ? window.location.origin : "");

  if (!providerId) return base;
  return `${base}/providers/${providerId}`;
}

export function ProviderQr({
  providerId,
  fullUrl,
  size = 220,
  fileName = "provider-qr",
  className,
}: ProviderQrProps) {
  const url = useMemo(() => resolveProviderUrl(providerId, fullUrl), [providerId, fullUrl]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fileName}.png`;
    link.click();
  };

  const handlePrint = () => {
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const win = window.open("", "_blank", "width=480,height=600");
    if (!win) return;
    win.document.write(`
      <html>
        <head><title>${fileName}</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;padding:24px;">
          <img src="${dataUrl}" style="max-width:100%;height:auto;" />
          <p style="margin-top:16px;word-break:break-all;text-align:center;">${url}</p>
          <script>window.onload = () => { window.print(); window.onafterprint = () => window.close(); };</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div ref={wrapperRef} className="rounded-md bg-white p-3">
          <QRCodeCanvas
            value={url}
            size={size}
            level="M"
            includeMargin={false}
          />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {url}
        </a>

        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download /> PNG
          </Button>
          <Button variant="outline" className="flex-1" onClick={handlePrint}>
            <Printer /> Imprimir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProviderQr;
