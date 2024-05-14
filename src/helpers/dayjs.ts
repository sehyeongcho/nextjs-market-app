/**
 * 날짜와 시간에 대한 구문 분석, 유효성 검사, 조작, 출력을 간편하게 처리하는 Day.js 라이브러리를 설정하는 파일입니다.
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export function fromNow(time: string | Date) {
  return dayjs(time).fromNow()
}

export function formatTime(time: string | Date, format = 'YYYY.MM.DD h:mm A') {
  return dayjs(time).format(format)
}
