"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  PageContainer,
  ButtonContainer,
  HeaderContainer,
  HeaderTitle,
  NextButton,
  StyledWrapper,
  TripTypeContainer,
  BackButton,
  ShareButton,
} from "../styledComponent/TripType/StyledTripType";
import img1 from "../../public/culture.jpeg";
import img2 from "../../public/zoo.jpeg";
import img3 from "../../public/family.jpeg";
import img4 from "../../public/romantic.webp";
import img5 from "../../public/sea.jpeg";
import img6 from "../../public/tourism.jpeg";
import img7 from "../../public/adventure.jpeg";
import img8 from "../../public/religion.jpeg";
import { useRouter } from "next/navigation";
import Program from "./Program";

const testItems = [
  { id: 1, title: "ثقافية", img: img1 },
  { id: 2, title: "ترفيهية", img: img2 },
  { id: 3, title: "عائلية", img: img3 },
  { id: 4, title: "رومانسية", img: img4 },
  { id: 5, title: "بحرية", img: img5 },
  { id: 6, title: "سياحية", img: img6 },
  { id: 7, title: "مغامرة", img: img7 },
  { id: 8, title: "دينية", img: img8 },
];

const MemoizedImage = React.memo(({ src, alt, style }) => (
  <Image src={src} alt={alt} style={style} />
));

const MemoizedHeaderTitle = React.memo(({ children }) => (
  <HeaderTitle>
    <span
      style={{
        color: "#FFA500",
        fontSize: "44px",
        fontWeight: "bold",
      }}
    >
      {children}
    </span>{" "}
    للإستمتاع بفسحة مميزة
  </HeaderTitle>
));

const TripType = ({ items = testItems }) => {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const router = useRouter();

  const handleSelect = useCallback((title) => {
    setSelectedTitle(title);
  }, []);

  const handleNext = useCallback(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    storedData.selectedTitle = selectedTitle;
    localStorage.setItem("formData", JSON.stringify(storedData));
    setTripType(false);
    router.push("/create?showProgram=true");
  }, [selectedTitle, router]);

  const renderItems = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item.id}
          className={`card-container ${
            selectedTitle === item.title ? "selected" : ""
          }`}
          transition={{ duration: 0.3 }}
          onClick={() => handleSelect(item.title)}
        >
          <div className="card">
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedTitle === item.title}
              onChange={() => handleSelect(item.title)}
            />
            <div className="img-content">
              <MemoizedImage
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="content">
              <p className="heading">{item.title}</p>
            </div>
          </div>
        </div>
      )),
    [items, selectedTitle, handleSelect]
  );

  const searchParams = useSearchParams();
  const [tripType, setTripType] = useState(true);

  useEffect(() => {
    const showProgram = searchParams.get("showProgram");
    const showTripType = searchParams.get("showTripType");
    if (showProgram) {
      setTripType(false);
    }
    if (showTripType) {
      setTripType(true);
    }
  }, [searchParams]);


  return (
    <>
      {tripType && (
        <PageContainer>
          <TripTypeContainer>
            <HeaderContainer>
              <MemoizedHeaderTitle>اختر نوع رحلتك</MemoizedHeaderTitle>
            </HeaderContainer>

            <StyledWrapper>{renderItems}</StyledWrapper>

            <ButtonContainer>
              <ShareButton
                style={{ marginTop: "0.5rem", marginLeft: "4rem" }}
                onClick={handleNext}
              >
                التالي
              </ShareButton>
              <BackButton
                style={{ marginTop: "0.5rem" }}
                onClick={() => router.push("/create?showCreate=true")}
              >
                رجوع
              </BackButton>
            </ButtonContainer>
          </TripTypeContainer>
        </PageContainer>
      )}
      {!tripType && <Program />}
    </>
  );
};

export default React.memo(TripType);
