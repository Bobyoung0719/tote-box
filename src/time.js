
/**
 * 时间解析器方法
 * @param time {Number(millisecond)}
 * @param units {Array(['年', '月', '周', '天', '小时', '分钟', '秒'])}
 * @returns {Array} 比如：[ '1周', '14小时', '29秒' ]
 */
export function timeParser(time, units = '年 月 周 天 小时 分钟 秒'.split(' ')) {
  const timeKeys = 'year month week day hours minutes second'.split(' '),
    timeValues = [1, 12, 4, 7, 24, 60, 60],
    yearMilliseconds = 1000 * 60 * 60 * 24 * 365;
  
  let values = {},
    ret = [];
  
  timeKeys.reduce((prev, cur, i) => {
    let next;
    
    if (i === 0) {
      next = time / yearMilliseconds;
    } else {
      next = (prev - Math.floor(prev)) * timeValues[i];
    }
    
    values[cur] = Math.floor(next);
    
    return next;
  }, time);
  
  timeKeys.forEach((key, i) => {
    if (values[key]) {
      ret.push(`${values[key]}${units[i]}`);
    }
  });
  
  return ret;
}