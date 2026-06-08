import axios from 'axios';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const baseURL = process.env.AS400_BASE_URL ?? 'http://localhost/quomrest';
const parser = new XMLParser({ ignoreAttributes: false, parseTagValue: true, trimValues: true });
const builder = new XMLBuilder({ ignoreAttributes: false, format: false });

const http = axios.create({
  baseURL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/xml', Accept: 'application/xml' },
  responseType: 'text',
  validateStatus: () => true,
});

const toXml = (rootName: string, payload: Record<string, unknown>) =>
  builder.build({ [rootName]: payload });

const parseResponse = (xml: string) => {
  if (!xml) return null;
  try { return parser.parse(xml); } catch { return { raw: xml }; }
};

const handle = async (path: string, method: 'GET' | 'POST', rootName?: string, body?: any) => {
  const xml = body && rootName ? toXml(rootName, body) : undefined;
  const res = await http.request({ url: path, method, data: xml });
  const parsed = parseResponse(typeof res.data === 'string' ? res.data : '');
  if (res.status >= 400) {
    const err: any = new Error('AS400 request failed');
    err.status = res.status;
    err.detail = parsed;
    throw err;
  }
  return parsed;
};

export const as400 = {
  // POST
  startInstallation: (b: { tipo: string; numero: string; detalle: string; usuario: string }) =>
    handle('/WSPIW1/', 'POST', 'solicitudInstalacion', b),
  changeInstallation: (b: any) => handle('/WSPIWc', 'POST', 'chgInstWeb', b),
  installObjects: (b: any) => handle('/WSPIW2', 'POST', 'instalacionObjetos', b),
  installSources: (b: any) => handle('/WSPIW3', 'POST', 'instalacionFuentes', b),
  backup: (b: any) => handle('/WSPbkf', 'POST', 'backUpCompleto', b),
  // GET
  list: () => handle('/WSRIWL/a/ca/1', 'GET'),
  detail: (tipo: string, numero: string, sec: string | number) =>
    handle(`/WSRIWD/a/ca/${tipo}/${numero}/${sec}`, 'GET'),
};
