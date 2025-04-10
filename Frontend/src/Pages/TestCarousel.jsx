import React, { useState, useMemo, useRef, use } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TestCarouselMocData } from "../Assests/TestCarousel/TestCarousel";
import PackagesCard from "../Components/PackagesCard";
import { familyPackages } from "../Assests/TestCarousel/TestWithPricesData";
import { Container, Row } from "react-bootstrap";
import SwitchButton from "../Components/SwitchButton";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mediumScreen: {
    breakpoint: { max: 768, min: 500 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const TestCarousel = () => {
  const [testType, setTestType] = useState("Pathalogy Test");
  const [showCards, setShowCards] = useState(false);
  const [showtable , setShowTable]=useState(true)
  // Create a ref for the tests section
  const testSectionRef = useRef(null);

  const memoizedPackages = useMemo(() => {
    return familyPackages.map((data, index) => (
      <PackagesCard key={index} data={data} />
    ));
  }, []);

  const handleImageClick = (data) => {
    if (data.title === "Family Package Test") {
      setShowCards(true);
      setShowTable(false)
    } else {
      setShowCards(false);
    }
    setTestType(data.title);

    // Scroll to the tests section when the image is clicked
    if (testSectionRef.current) {
      testSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="carousel-container m-3" id="ourTests">
        <h1 className="carousel-title mb-5 text-center">
          Our <strong>Test</strong>
        </h1>

        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={1000}
          containerClass="carousel-inner"
        >
          {TestCarouselMocData.map((data, index) => (
            <div
              className="slider"
              key={index}
              onClick={() => handleImageClick(data)} // Handle the click here
            >
              <div className="image_container">
                <img src={data.image} alt="test" className="image" />
              </div>
              <p className="slider-title text-center">{data.title}</p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Conditionally render either the Cards or the TestWithPrices component */}
      <Container ref={testSectionRef}>
        {showCards ? (
          <Row id="tests">{memoizedPackages}</Row>
        ) :  <SwitchButton  TestType={testType} showCards={showCards} showtable={showtable} />
      }
      </Container>
    </>
  );
};

export default TestCarousel;
