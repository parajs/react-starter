import dayjs from 'dayjs'

/**
 * 格式化时间
 * @param date
 * @param template
 * @returns
 */
export function dayjsFormat(date: dayjs.ConfigType, template?: string) {
  if (!date) return ''
  return dayjs(date).format(template || 'YYYY-MM-DD HH:mm ')
}

/**
 *
 * 格式化时间
 */
export function timeAgo(
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
  template?: string,
  type?: string
) {
  if (!date) return ''

  const d = dayjs(date).valueOf()
  const now = Date.now()
  //
  const minutesAgoFromNow = Math.floor((now - d) / (1000 * 60))
  if (minutesAgoFromNow < 1) {
    return 'just now'
  }

  if (minutesAgoFromNow < 60) {
    return minutesAgoFromNow == 1 ? `${minutesAgoFromNow} minute` : `${minutesAgoFromNow} minutes`
  }

  if (minutesAgoFromNow < 60 * 24) {
    const h = Math.floor(minutesAgoFromNow / 60)
    return h == 1 ? `${h} hour ago` : `${h} hours ago`
  }
  if (type) {
    const d = Math.floor(minutesAgoFromNow / 60 / 24)
    return d == 1 ? `${d} day ago` : `${d} days ago`
  }
  return dayjsFormat(date, template)
}
