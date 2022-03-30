import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisney = [];
  let original = [];
  let trending = [];

  const RecommendsComponent = React.lazy(() => {
    return new Promise((resolve, reject) => {
      // return setTimeout(() => {
      return resolve(import("./Recommends"));
      // }, 1000);
    });
  });

  const TrendingComponent = React.lazy(() => {
    return new Promise((resolve, reject) => {
      // return setTimeout(() => {
      return resolve(import("./Trending"));
      // }, 2000);
    });
  });

  const OrignalComponent = React.lazy(() => {
    return new Promise((resolve, reject) => {
      // return setTimeout(() => {
      return resolve(import("./Originals"));
      // }, 3000);
    });
  });

  const NewDisneyComponent = React.lazy(() => {
    return new Promise((resolve, reject) => {
      // return setTimeout(() => {
      return resolve(import("./NewDisney"));
      // }, 4000);
    });
  });

  // const RecommendsComponent = React.lazy(
  //   () =>
  //     new Promise((resolve, reject) =>
  //       setTimeout(() => resolve(import("./Recommends")), 3000)
  //     )
  // );

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            original = [...original, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisney,
          original: original,
          trending: trending,
        })
      );
    });
  }, [userName]);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Suspense fallback={<div>Loading</div>}>
        <RecommendsComponent />
        <NewDisneyComponent />
        <OrignalComponent />
        <TrendingComponent />
      </Suspense>
      {/* <Recommends />
      <NewDisney />
      <Originals />
      <Trending /> */}
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 75px;
  padding: 0 calc(3.5vw + 5px);
  /* background: url("/images/home-background.png"); */

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
