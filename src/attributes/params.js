export const attributeOptions = {
  versions: {
    name: 'Version Parameters',
    description:
      '<h2>Model Version Parameters</h2><p>Midjourney routinely releases new model versions to improve efficiency, coherency, and quality. Different models excel at different types of images</p><ul><li>Niji : An alternative model focused on anime style images.</li><li>High Definition : an early alternative Model that produces larger, less consistent images. This algorithm may be suitable for abstract and landscape images.</li><li>Test uses special test model.</li><li>Testp is photography focused test model.</li></ul>',

    groupId: 'versions',
    options: [
      { value: 'niji', label: 'Niji' },
      { value: 'hd', label: 'HD' },
    ],
  },
  aspectRatio: {
    name: 'Aspect Ratio',
    description:
      '<h2>Aspect Ratio</h2><p>Common aspect ratios include: </p><ul> <li>1:1 default value is square</li><li>3:2 common in print photography</li>  <li> 5:4 for frame and print ratio</li><li> 7:4 HDTV and smartphone screens.</li></ul>',
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
    prefix: '--quality',
    groupId: 'quality',
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

// chaos: {
//     name: 'Chaos',
//     description:
//       'This parameter influences how vaired the inital image  grids are.  The higher the value the more unusual and unexpected results and differences between the variations.',
//     max: 100,
//     slider: true,
//     prefix: '--chaos:',
//     default: 50,
//   },
