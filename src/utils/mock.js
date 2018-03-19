export function mockEchartData(num) {
  let data = []
  for (let i = 0; i < 30; i++) {
    data.push(Math.round((Math.random()) * 100 + num))
  }
  return data
}
