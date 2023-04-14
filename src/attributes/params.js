export const attributeOptions = {
  versions: {
    name: 'Model Version Parameters',
    description:
      '<h2>Model Version Parameters</h2><p>Midjourney routinely releases new model versions to improve efficiency, coherency, and quality. Different models excel at different types of images</p><ul><li>Niji : An alternative model focused on anime style images.</li><li>High Definition : an early alternative Model that produces larger, less consistent images. This algorithm may be suitable for abstract and landscape images.</li><li>Test uses special test model.</li><li>Testp is photography focused test model.</li></ul> <a href="https://docs.midjourney.com/docs/parameter-list" target="_blank">Learn more about parameters &#129125; </a>',

    groupId: 'versions',
    options: [
      { value: 'niji', label: 'Niji' },
      { value: 'hd', label: 'HD' },
      { value: 'test', label: 'Test' },
      { value: 'testp', label: 'Testp' },
    ],
  },
  aspectRatio: {
    name: 'Aspect Ratio',
    description:
      '<h2>Aspect Ratio</h2><p>Common aspect ratios include: </p><ul> <li>1:1 default value is square</li><li>3:2 common in print photography</li>  <li> 5:4 for frame and print ratio</li><li> 7:4 HDTV and smartphone screens.</li></ul> <a href="https://docs.midjourney.com/docs/aspect-ratios" target="_blank">Learn more about aspect ratios &#129125; </a>',
    prefix: '--ar ',
    groupId: 'aspectRatio',
    options: [
      { value: '2:3', label: '2:3' },
      { value: '3:2', label: '3:2' },
      { value: '4:5', label: '4:5' },
      { value: '5:4', label: '5:4' },
      { value: '4:7', label: '4:7' },
      { value: '7:4', label: '7:4' },
    ],
  },

  quality: {
    name: 'Quality',
    description:
      '<h2>Quality</h2> <p>The quality parameter changes how much time is spent genrating the image and higher values take longer to generate and produce more details. </p> <p>Higher values also mean more GPU minutes are used. THe quality is not related to the resolution of the image. </p><p> As of Version 4 the highest quality setting is 1 which is the default.  You may want to use a lower quality setting to see what kind of results you get, sometimes they may look better especially for a general astract look.</p><a href="https://docs.midjourney.com/docs/quality" target="_blank">Learn more about quality &#129125; </a>',
    options: [
      { value: '.25', label: '.25' },
      { value: '.5', label: '.5' },
    ],
    prefix: '--quality ',
    groupId: 'quality',
  },
  chaos: {
    name: 'Chaos',
    description:
      '<h2>Chaos</h2> <p>This parameter influences how vaired the inital image grids are. </p><p> The higher the value the more unusual and unexpected results and differences between the variations.</p><p>A lower value will create more reliable, repeatble results.</p><a href="https://docs.midjourney.com/docs/chaos" target="_blank">Learn more about chaos &#129125; </a>',
    options: [],
    groupId: 'chaos',
    max: 100,
    slider: true,
    steps: 5,
    prefix: '--chaos ',
    default: 0,
  },
  stylize: {
    name: 'Stylize',
    description:
      '<h2>Stylize</h2> <p>The Midjourney Bot has been trained to produce images that favor artistic color, composition, and forms.</p><p> The --stylize or --s parameter influences how strongly this training is applied. </p> <p> The lower the value, the more closely the image will match the prompt but less artistic. </p><p> Inversely, hige values create images that are very artistic but less related to the prompt.</p><p>The default value for versions 4 and 5 is 100</p><a href="https://docs.midjourney.com/docs/stylize" target="_blank">Learn more about stylize &#129125; </a>',
    options: [],
    groupId: 'stylize',
    max: 1000,
    slider: true,
    steps: 10,
    prefix: '--stylize ',
    default: 100,
  },
  // tests: {
  //   name: 'Test Models',
  //   description:
  //     '<h2>Test Models</h2> <p>Special test models are available.</p> <p>Testp is a photography focused model.</p> <p>Test is a general model.</p><p>Also make the createive parameter available which allws the models to more varied and creative.</p>',
  //   options: [{ value: 'test' }, { value: 'testp' }, { value: 'creative' }],
  //   type: 'checkbox',
  //   prefix: '--',
  //   groupId: 'tests',
  // },
};
