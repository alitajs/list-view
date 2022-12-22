import { useLockFn } from 'ahooks';
import { AliasProps, Result } from '../PropType';

/**
 * whether in browser env
 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

/**
 * 像素转换
 * @param {Number} px - 750视觉稿像素
 * @return {Number} 屏幕上实际像素
 */
export const px2hd = (px: number) => {
  if (isBrowser()) {
    const ONE_REM = parseInt(document.documentElement.style.fontSize, 10) || 100;
    const SCALE = ONE_REM / 100;
    return Number((px * SCALE).toFixed(1));
  }
  return Number(px.toFixed(1));
};

export const getAliasWithPropsAlias = (propsAlias: object) => {
  const defaultAlias = {
    data: 'data',
    pageSize: 'pageSize',
    offset: 'offset',
    total: 'total',
    page: 'page',
  };
  return { ...defaultAlias, ...propsAlias };
};

export const getParamsWithAlias = (
  requestParams: object,
  userAlias: AliasProps,
  status: 'loading' | 'loadmore' | string,
  startPage = 1,
) => {
  const reqParams = Object.assign(requestParams);
  const trueAlias = getAliasWithPropsAlias(userAlias);
  const offset = reqParams[trueAlias.offset];
  const page = reqParams[trueAlias.page];
  if (status === 'loadmore') {
    if (offset) {
      reqParams[trueAlias.offset] =
        Number(reqParams[trueAlias.offset]) + Number(reqParams[trueAlias.pageSize]);
    }
    if (page) {
      reqParams[trueAlias.page] = Number(reqParams[trueAlias.page]) + 1;
    }
  } else {
    if (offset) {
      reqParams[trueAlias.offset] = startPage;
    }
    if (page) {
      reqParams[trueAlias.page] = startPage;
    }
  }
  return reqParams;
};

export const restorePreRequestParams = (
  requestParams: object,
  userAlias: AliasProps,
  status: 'loading' | 'loadmore' | string,
  startPage = 1,
) => {
  const reqParams = Object.assign(requestParams);
  const trueAlias = getAliasWithPropsAlias(userAlias);
  const offset = reqParams[trueAlias.offset];
  const page = reqParams[trueAlias.page];
  if (status === 'loadmore') {
    if (
      offset &&
      Number(reqParams[trueAlias.offset]) - Number(reqParams[trueAlias.pageSize]) >
        Number(reqParams[trueAlias.pageSize])
    ) {
      reqParams[trueAlias.offset] =
        Number(reqParams[trueAlias.offset]) - Number(reqParams[trueAlias.pageSize]);
    }
    if (page && reqParams[trueAlias.page] > startPage) {
      reqParams[trueAlias.page] = Number(reqParams[trueAlias.page]) - 1;
    }
  } else {
    if (offset) {
      reqParams[trueAlias.offset] = startPage;
    }
    if (page) {
      reqParams[trueAlias.page] = startPage;
    }
  }
  return reqParams;
};

export const asyncFn = (
  requestFunc,
  requestParams,
  alias,
  status: 'loading' | 'loadmore' | string,
  startPage = 1,
): Promise<Result> => {
  const reqParams = getParamsWithAlias(requestParams, alias, status, startPage);
  const isRefresh: boolean = status === 'loading';
  return requestFunc(reqParams, isRefresh);
};

export const getInitialListSize = (pageSize, initialListSize) => {
  if (initialListSize) {
    return initialListSize;
  }
  return pageSize || 25;
};
