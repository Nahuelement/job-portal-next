/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    API_URL:'https://portal-trabajos.herokuapp.com/',
    MAPBOX_ACCES_TOKEN:'pk.eyJ1IjoibmFodWVsZW1lbnQiLCJhIjoiY2w4cml5bW51MXFreDNwbzgydjVnd2loeSJ9.2gd6xFgCb-9ToP89EjbvSQ'
  }
}

module.exports = nextConfig
