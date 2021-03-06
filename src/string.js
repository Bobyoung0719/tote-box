import { isPlainObject, isEmpty, isUndefined } from 'lodash';

/**
 * 转换 text 中在 data 中出现的占位为最终字符串
 * 例如：text = 'Hello, {name}!', data = { name: 'Nicolas' } 会转换为 'Hello, Nicolas!'
 * 如果 dataReplaceable 设置为 true，会删除 data 中被 text 匹配到的值
 * @param {String} text 
 * @param {Object} data 
 * @param {Boolean} dataReplaceable 
 */
export function parseTextPlaceholder(text, data, dataReplaceable = false) {
  let rPlaceholder = /\{([^}]+)\}/g;

  if (rPlaceholder.test(text) && isPlainObject(data) && !isEmpty(data)) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      let val = data[placeholder];

      if (!isUndefined(val)) {
        if (dataReplaceable) {
          delete data[placeholder];
        }

        return val;
      }

      return match;
    });
  }

  return text;
}

// example: format('Do {0} love {1}? Yes, {2} love {0}!', 'you', 'me', 'I');
// return: 'Do you love me? Yes, I love You!'
export function parseNumberPlaceholder(text, ...params) {
  return text.replace(/\{(\d+)\}/g, function (m, i) {
    return params[i];
  });
}

export function formatSize(bytes) {
  let i = -1;

  do {
    bytes = bytes / 1024;
    i++;
  } while (bytes >= 1024);

  return parseFloat(Math.max(bytes, 0.1).toFixed(2)) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
}

export function trim(text) {
  return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export const html = {
  entityify(text) {
    const character = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    };

    return text.replace(/[<>"&]/g, function (match) {
      return character[match];
    });
  },

  deentityify(text) {
    const entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };

    return text.replace(/&([^&;]+);/g, function (match, key) {
      const ret = entity[key];

      return typeof ret === 'string' ? ret : match;
    });
  },

  strip: function (text) {
    return text.replace(/<(?:.|\s)*?>/g, '');
  },

  escape(text) {
    if (typeof text !== 'string') {
      return '';
    }
    
    const rscript = /<script[^>]*>(?:(?:(?!<\/script>).)*<\/script>)?/gi,
      rstyle = /<style[^>]*>(?:(?!@import|<\/style>).)*@import(?:(?!<\/style>).)+<\/style>/gi,
      rlink = /<link(?:(?!\.css).)+\.css[^>]*>/gi,
      rinnerevent = /on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s\/>]+)/gi,
      rinnerexpress = /javascript:/gi;
    
    return text.replace(rscript, '')
      .replace(rstyle, '')
      .replace(rlink, '')
      .replace(rinnerevent, '')
      .replace(rinnerexpress, '');
  },

  filter: function (text, maxlength) {
    if (text === '')
      return '';

    text = text

      // 将2个以上的空字符转换为一个
      .replace(/\s{2,}/g, ' ')

      // 将所有HTML的换行标记转换为换行符
      .replace(/<br\s*\/?>/g, '\n')

      // 将所有HTML的空格标记转换为一个空字符
      .replace(/(\s*&(n|N)(b|B)(s|S)(p|P);\s*)+/g, ' ')

      // 将单个单引号转换为成对的单引号
      .replace(/'/g, "''");

    // 过滤掉两端空格及HTML标记
    text = trim(text);
    text = this.strip(text);

    if (typeof maxlength === 'number') {
      text = text.substring(0, maxlength);
    }

    return text;
  }
};
