# Nextwind
This is created by [Next.js](https://nextjs.org/) with [tailwind](tailwindcss.com).

## What this project is
This is a interaction view page. The section of the page will be animated by how deep scroll is in. Not imediately completed when viewport is in the section like as other many of web pages with interaction.

## How it works
* Detect the viewport is in a section.
* Measure the scroll percent from start point(0%) to end point(100%) with threshold value. 
* Make interaction in some point of measured percent you want.

## Core
> `ContentsWrapper`
: It's wrapper component for letting children component stick in viewport.

> `useScrollProgress`
: It's for calculating the percent by how deep scroll is in and threshold value. And handling scroll event listner.

> `getWeightByProgress`
: It's for calculating the value that you can use at interaction value(e.g: opacity value of css) by the percent range you want.

----
<br>

## Demo
You can check out the demo page at this
[link](https://nextwind-rho.vercel.app/)

----
<br>

## Published module in NPM
[framed-animation-on-scroll](https://www.npmjs.com/package/framed-animation-on-scroll)

----
<br>

## License
This project is licensed under the terms of the
[MIT license](https://github.com/cha-yh/Nextwind/blob/master/LICENSE.md).

