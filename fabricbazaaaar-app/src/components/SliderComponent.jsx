import React from 'react';

// function MyComponent() {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const slides = document.querySelectorAll(".mySlides");

//   const plusSlides = (n) => {
//     let newIndex = slideIndex + n;
//     if (newIndex > slides.length - 1) {
//       newIndex = 0;
//     }
//     if (newIndex < 0) {
//       newIndex = slides.length - 1;
//     }
//     setSlideIndex(newIndex);
//   };

//   const showSlides =() => {
//     const updatedSlides = document.querySelectorAll(".mySlides");
//     const updatedIndicator = document.querySelectorAll(".indicator");

//     for (let i = 0; i < updatedSlides.length; i++) {
//       updatedSlides[i].style.display = "none";
//       updatedIndicator[i].classList.remove("active-ind");
//     }
//     updatedSlides[slideIndex].style.display = "block";
//     updatedIndicator[slideIndex].classList.add("active-ind");
//   };
//   // showSlides();
//   useEffect(() => {
//     showSlides();
//     setInterval(() => {
//       plusSlides(1);
//     }, 2000);
//   });

//   const items = document.querySelectorAll(".cat-card");
//   items.forEach((element) => {
//     element.addEventListener("click", (event) => {
//       window.location.href = "/productPage"; // Assuming this is your product page route
//     });
//   });

//   return (
//     <div className="slider-container">
//       <div className="carousel">
//         {/* Slides */}
//         <div className="mySlides fade">
//           <img src="img/Home.png" alt="Slide 1" />
//         </div>
//         <div className="mySlides fade">
//           <img src="img/Home2.png" alt="Slide 2" />
//         </div>
//         <div className="mySlides fade">
//           <img src="img/Home4.jpg" alt="Slide 2" />
//         </div>
//         <div className="indicator-container">
//           <div className="indicator"></div>
//           <div className="indicator"></div>
//           <div className="indicator"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyComponent;
// import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function SliderComponent() {
  return (
    <Carousel animationHandler="fade" showArrows={false} showStatus={false} autoPlay={true} interval={2000} showThumbs={false} infiniteLoop="true" swipeable={false } width={"95vw"} dynamicHeight={false} stopOnHover={false}>
      <div className='mySlides'>
        <img src="img/Home.png" alt="Slide 1"style={{ width: '100%', height: '500px' }}/>
      </div>
      <div className='mySlides'>
        <img src="img/Home2.png" alt="Slide 2" style={{ width: '100%', height: '500px' }}/>
      </div>
      <div className='mySlides'>
        <img src="img/Home3.jpg" alt="Slide 3" style={{ width: '100%', height: '500px' }}/>
      </div>
      <div className='mySlides'>
        <img src="img/Home4.jpg" alt="Slide 4" style={{ width: '100%', height: '500px' }}/>
      </div>
    </Carousel>
  )
}
