import { useEffect, useState } from 'react';

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (error) {
      return 'Failed';
    }
    document.body.removeChild(textArea);
    return 'Success';
  }
}

export function downloadAs(text: string, filename: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


export function useMobileScreen() {
  const [isMobileScreen_, setIsMobileScreen] = useState(isMobileScreen());
  useEffect(() => {
    const onResize = () => {
      setIsMobileScreen(isMobileScreen());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobileScreen_;
}

export function isMobileScreen() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth <= 600;
}

export function isFirefox() {
  return (
    typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent)
  );
}

export function selectOrCopy(el: HTMLElement, content: string) {
  const currentSelection = window.getSelection();

  if (currentSelection?.type === 'Range') {
    return false;
  }

  copyToClipboard(content);

  return true;
}

function getDomContentWidth(dom: HTMLElement) {
  const style = window.getComputedStyle(dom);
  const paddingWidth =
    parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const width = dom.clientWidth - paddingWidth;
  return width;
}

function getOrCreateMeasureDom(id: string, init?: (dom: HTMLElement) => void) {
  let dom = document.getElementById(id);

  if (!dom) {
    dom = document.createElement('span');
    dom.style.position = 'absolute';
    dom.style.wordBreak = 'break-word';
    dom.style.fontSize = '14px';
    dom.style.transform = 'translateY(-200vh)';
    dom.style.pointerEvents = 'none';
    dom.style.opacity = '0';
    dom.id = id;
    document.body.appendChild(dom);
    init?.(dom);
  }

  return dom!;
}

export function autoGrowTextArea(dom: HTMLTextAreaElement) {
  const measureDom = getOrCreateMeasureDom('__measure');
  const singleLineDom = getOrCreateMeasureDom('__single_measure', (dom) => {
    dom.innerText = 'TEXT_FOR_MEASURE';
  });

  const width = getDomContentWidth(dom);
  measureDom.style.width = width + 'px';
  measureDom.innerHTML = dom.value.trim().length > 0 ? dom.value : '1';

  const lineWrapCount = Math.max(0, dom.value.split('\n').length - 1);
  const height = parseFloat(window.getComputedStyle(measureDom).height);
  const singleLineHeight = parseFloat(
    window.getComputedStyle(singleLineDom).height
  );

  const rows = Math.round(height / singleLineHeight) + lineWrapCount;

  return rows;
}

export function getCSSVar(varName: string) {
  return getComputedStyle(document.body).getPropertyValue(varName).trim();
}

interface EnvironmentInfo {
  os: 'win' | 'mac' | 'linux' | 'android' | 'ios';
  env: 'electron' | 'web';
}

export function detectEnvironment(): EnvironmentInfo {
  let os: 'win' | 'mac' | 'linux' | 'android' | 'ios' = 'win';
  let env: 'electron' | 'web' = 'web';

  // 检测操作系统
  if (navigator.platform.includes('Win')) os = 'win';
  else if (navigator.platform.includes('Mac')) os = 'mac';
  else if (navigator.platform.includes('Linux')) os = 'linux';
  else if (/Android/i.test(navigator.userAgent)) os = 'android';
  else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) os = 'ios';

  // 检测 Electron 环境
  if (/electron/i.test(navigator.userAgent)) env = 'electron';

  return {
    os,
    env,
  };
}
