# Nextwind
This is created by [Next.js](https://nextjs.org/) with [tailwind](tailwindcss.com).

## What this project is
This is a interaction view page. The section of the page will be animated by how deep scroll is in. Not imediately completed when viewport is in the section like as other many of web page with interaction.

## How it works
* Detact the viewport is in a section.
* Measure the scroll percent from start point(0%) to end point(100%) with threshold value. 
* Make interaction in some point you want by scroll percent.
When , they start to measure percent of scroll in only section has

## Core
> `ScrollTransformWrapper`
: It's wrapper component for letting children component stick in viewport.

> `useScrollPercent`
: It's for calculating the percent by how deep scroll is in and threshold value. And handling scroll event listner.

> `getCalculatedValueByPercent`
: It's for calculating the value that you can use at interaction value(e.g: opacity value of css) by the point range you want and percent.

## License
This project is licensed under the terms of the
[MIT license](https://github.com/cha-yh/Nextwind/blob/master/LICENSE.md).

