export const attributeOptions = {
  aspectRatio: {
    name: 'Aspect Ratio',
    description:
      'The default aspect ration is 1:1. Common aspect ratios include 5:4 for frame and print ratio, 3:2 common in print photography, and 7:4 close to HD TV and smartphone screens.',
    prefix: '--ar:',
    options: [
      { value: '2:3', label: '2:3' },
      { value: '3:2', label: '3:2' },
      { value: '4:5', label: '4:5' },
      { value: '5:4', label: '5:4' },
      { value: '4:7', label: '4:7' },
      { value: '7:4', label: '7:4' },
    ],
  },
  chaos: {
    name: 'Chaos',
    description:
      'This parameter influences how vaired the inital image  grids are.  The higher the value the more unusual and unexpected results and differences between the variations.',
    max: 100,
    slider: true,
    prefix: '--chaos:',
  },
  quality: {
    name: 'Quality',
    description:
      'Quality parameter changes how much time is spent genrating the image.  Higher values will take longer to generate and produce more details.  Higher values also mean more GPU minutes are used. THe quality is not related ot the resolution of the image.  As ov Version 4 the highest quality setting is 1 which is the default.  You may want to use a lower quality setting to see what kind of results you get, sometimes they may look better especially for a general astract look.',
    options: [
      { value: '.25', label: '.25' },
      { value: '.5', label: '.5' },
    ],
    prefix: '--quality',
  },
};
