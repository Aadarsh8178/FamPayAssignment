import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "querystring";
import { StyledArrowIcon } from "../../StyledIcons";
import getCoordinates from "../../utils/getCoordinates";
import getDistance from "../../utils/getDistance";
import prizes from "../../prizeData";
import moment from "moment";
import {
  Container,
  Wrapper,
  Rectangle,
  Triangle,
  DownArrow,
  Circle,
  WheelSegment,
  Text,
  SpinButton,
  SpinButtonWrapper,
} from "./styles";

function Wheel() {
  const [pause, setPause] = useState(true); //to pause and play animation
  const [oneRotationTime, setOneRotationTime] = useState(2); //2s for one complete rotation
  const [wheelElem, setWheelElem] = useState(); //Wheel HTML element
  const [center, setCenter] = useState({ x: 0, y: 0 }); //Center of the wheel
  const [startX, setStartX] = useState(0); //Starting position for drag event
  const [startY, setStartY] = useState(0);
  const [animate, setAnimate] = useState(false); //trigger for drag animation

  //setting static properties on first mount (center of circle ,circle HTML element)
  useEffect(() => {
    const wheel = document.getElementById("wheel");
    setWheelElem(wheel);
    const coords = getCoordinates(wheel); //coordinates of wheel with respect to browser window
    setCenter({
      x: coords.x + wheel.offsetWidth / 2,
      y: coords.y + wheel.offsetHeight / 2,
    });
  }, []);

  const animateWheel = (curX, curY) => {
    if (animate) {
      const r1 = getDistance(curX, curY, center.x, center.y); //distance between center and cur position
      const r2 = getDistance(startX, startY, center.x, center.y); //distance between center and drag start position
      const r3 = getDistance(curX, curY, startX, startY); //distance between drag start and cur

      // cos(a) = (r1^2+r2^2-r3^2)/2*r1*r2
      const acos = (r1 * r1 + r2 * r2 - r3 * r3) / (2 * r1 * r2);
      const radians = Math.acos(acos); // radian value between arm r1 and r2 from center of the circle \/
      const degrees = radians * 57.2958; // 1 radian = 57.2958 degrees

      //works till 180 degree need to improve
      //reduce one rotation time hence increase speed depending upon angle between r1 and r2
      if (degrees < 30) setOneRotationTime(3);
      else if (degrees < 60) setOneRotationTime(2.5);
      else if (degrees < 90) setOneRotationTime(2);
      else if (degrees < 130) setOneRotationTime(1);
      else if (degrees < 180) setOneRotationTime(0.6);

      wheelElem.style.transform = "rotate(-" + degrees + "deg)"; //rotating wheel to calculated degrees
    }
  };

  //Prize calculation after rotation
  const calculatePrize = () => {
    const downArrow = document.getElementById("arrow");
    const coords = getCoordinates(downArrow);
    coords.y = coords.y + downArrow.offsetHeight; //coordinates of arrow pointer
    const segment = document.elementFromPoint(coords.x, coords.y); //element below the arrow is the winning
    const index = Number(segment.attributes[0].nodeValue); //noevalue is the index of the element defined as id on Text
    console.log(prizes[index]); //Winning prize printed to console

    //Sending the request to google API sheets
    const params = qs.stringify({
      web_client: "web-server",
      timestamp: moment().format(),
      spin_result_index: index + 1,
    });
    const url =
      "https://script.google.com/macros/s/AKfycbxYEC6sUd7OvFJTKA4nqyMkvDgb98GO7yHUn9YEFDFsbyTRYYuQ/exec";
    axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  //continous spinning animation for random time
  const rotateWheel = () => {
    setPause(false);
    setTimeout(() => {
      setPause(true);
      //Calculate prize after settling down of rotation animation
      setTimeout(() => {
        calculatePrize();
      }, 200);
    }, Math.max(2000, Math.random() * 4000));
  };

  const segments = prizes.length; //total segments of the wheel
  const incDeg = 360 / segments; //segment's angle with center of circle
  let rotateDeg = -incDeg;

  const wheel = prizes.map((prize, idx) => {
    rotateDeg += incDeg;
    return (
      <WheelSegment
        rotate={rotateDeg}
        skewY={incDeg}
        background={prize.background}
        key={idx}
      >
        <Text id={idx}>
          {prize.description}
          {prize.longText && <span>{prize.longText}</span>}
          {prize.subdescription && <p>{prize.subdescription}</p>}
        </Text>
      </WheelSegment>
    );
  });

  return (
    <Container>
      <Wrapper>
        <DownArrow id="arrow">
          <Rectangle />
          <Triangle />
        </DownArrow>
        <Circle
          stopRotation={pause}
          rotationTime={oneRotationTime}
          id="wheel"
          onMouseDown={(e) => {
            setStartX(e.clientX);
            setStartY(e.clientY);
            setAnimate(true);
          }}
          onMouseUp={() => {
            setAnimate(false);
            rotateWheel();
          }}
          onMouseOver={(e) => {
            animateWheel(e.clientX, e.clientY);
          }}
        >
          {wheel}
        </Circle>
        <SpinButtonWrapper
          onClick={() => {
            setOneRotationTime(2);
            rotateWheel();
          }}
        >
          <SpinButton>Spin</SpinButton>
        </SpinButtonWrapper>
      </Wrapper>
      <div>
        <StyledArrowIcon />
      </div>
    </Container>
  );
}

export default Wheel;
