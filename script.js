function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

}
loco()

function canvas(){
    const canvas = document.querySelector("canvas"); //select the div
const context = canvas.getContext("2d");
// 2d tools are selected and saved in context

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// inner size covers the space without the window tab and search spaces

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // this will adjust even if the w&h reduces
  render();
});

function files(index) {
  var data = `
    // paste all images here!!
 `;
  return data.split("\n")[index];
}
// image file split from the string

const frameCount = 300; // no. of images

const images = []; //all set of images gets added after the image tag is given below
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image(); //new image tag is created
  img.src = files(i); // file is attached to the tag
  images.push(img); // added to list
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame", // to reduce decimal values in scroll frames
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,  // for animation to catch up with the scrolltrigger, delay, smoothness?
    trigger: `#page>canvas`, //where to start
    //   set start end according to preference
    start: `top top`,  //two values fo rthis trigger is element and then for the screen
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "// object you want to pin it.",
  pin: true,
  // markers:true,
  scroller: `#main`,
//   set start end according to preference
  start: `top top`,
  end: `600% top`,
});
}
canvas()