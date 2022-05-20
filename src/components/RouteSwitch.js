import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import App from "../App";
import Shop from "./Shop";
import Basket from "./Basket";
import Nav from "./Nav";
import { BasketContext, ShopContext } from "./GlobalState";
import Item from "./Item";
import { useLocalStorage } from "usehooks-ts";

const RouteSwitch = () => {
  const [shoppingCart, setShoppingCart] = useLocalStorage("basket", []);
  const [shopItems, setShopItems] = useState([
    {
      id: 1,
      title: "Fender Stratocaster",
      brand: "Fender",
      model: "Artist Signature Series - Jimi Hendrix model",
      colour: "White",
      price: 1200,
      description: `Three impeccible American Vintage '65 single-coil pickups produce an authentic tone that will inspire you to (at least try) to kiss the sky. They give the Stratocaster a tight, warm sound with enhanced trebles and heaps of definition. Boasting a 9.5" fretboard radius and a 1.65" string nut, the guitar's C-profile neck allows for comfortably grasped, complex chords as well as extreme bends and add to this instrument's immense versatility. The vintage-style synchronised tremolo is just begging to produce those death-defying dive bombs Jimi himself performed during his iconic rendition of the 'Star Spangled Banner' at Woodstock.`,
      img: "https://cdn.mos.cms.futurecdn.net/78e2f8dbc5170727bdb7a2941831a05f.jpg",
    },
    {
      id: 2,
      title: "Gibson SG",
      brand: "Gibson",
      model: "SG Custom 2-Pickup w/ Ebony Fingerboard Gloss",
      colour: "Black",
      price: 1400,
      description:
        "This recent Custom Shop addition takes the engine and aesthetics of the iconic Les Paul Custom and applies them to the SG platform. The result is a huge-sounding, fast-playing and classy-looking instrument that will bring out the best in any player. The solid ebony fingerboard projects chords and notes with clarity and sustain, while the 490R and 498T humbuckers compliment a wide range of sonic possibilities, from clean jazz to the heaviest distortion.",
      img: "https://static.gibson.com/product-images/Custom/CUSCPA862/Ebony/front-banner-1600_900.png",
    },
    {
      id: 3,
      title: "Ibanez GB10EM",
      brand: "Ibanez",
      model: "GB10EM",
      colour: "Sunburst",
      price: 569,
      description: `For nearly 60 years, George Benson has captivated audiences the world over as one of the best performers and recording artists of all-time. Crossing into multiple musical genres during his storied career, George has built a reputation as one of the most versatile, talented and respected guitarists in history. For over 40 years, George and Ibanez have worked together seamlessly, first by realizing George’s vision for his ideal electric hollow body guitar, the GB10 in 1977. Since then, there has been many other successful collaborations on George’s signature guitars, and Ibanez is now proud to announce the GB10EM, the most affordable GB models ever offered. As one of the most influential guitarists to ever pick up the instrument, George wanted to offer a signature guitar that was not only a great guitar but also accessible and obtainable to all players everywhere. Retaining some of the most integral signature appointments of the GB line, including the floating mini-humbucking pickups, compact fully hollow jazz guitar body, and iconic GB headstock inlay, the GB10EM has proved itself worthy of the name ""GB"", as deemed by the man himself, George Benson.`,
      img: "https://58eca9fdf76150b92bfa-3586c28d09a33a8c605ed79290ca82aa.ssl.cf3.rackcdn.com/ibanez-gb10em-antique-amber-1007280.jpg",
    },
    {
      id: 4,
      title: "Fender Telecaster",
      brand: "Fender",
      model: "American Professional",
      colour: "Mystic Seafoam",
      price: 1399,
      description: `The American Professional II Telecaster® draws from more than seventy years of innovation, inspiration and evolution to meet the demands of today’s working player.

      Our popular Deep "C” neck now sports smooth rolled fingerboard edges, a “Super-Natural” satin finish and a newly sculpted neck heel for a supremely comfortable feel and easy access to the upper register. New V-Mod II Telecaster single-coil pickups are more articulate than ever while delivering the twang, snap and snarl that made the Tele famous. The new top-load/string-through bridge with compensated “bullet” saddles is our most comfortable, flexible Tele bridge yet – retaining classic brass-saddle tone and providing excellent intonation and flexible setup options, allowing you to tailor the tension and tone of each string to your liking.
      
      The American Pro II Telecaster delivers instant familiarity and sonic versatility you’ll feel and hear right away, with broad ranging improvements that add up to nothing less than a new standard for professional instruments.`,
      img: "https://cdn.mos.cms.futurecdn.net/d6525d2c3aadfa4dd2b373d360cb9a63-1200-80.jpg",
    },
  ]);
  const basketValue = useMemo(
    () => ({ shoppingCart, setShoppingCart }),
    [shoppingCart, setShoppingCart]
  );
  const shopValue = useMemo(
    () => ({ shopItems, setShopItems }),
    [shopItems, setShopItems]
  );

  return (
    <BrowserRouter>
      <ShopContext.Provider value={shopValue}>
        <BasketContext.Provider value={basketValue}>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Item />} />
            <Route path="/basket" element={<Basket />} />
          </Routes>
        </BasketContext.Provider>
      </ShopContext.Provider>
    </BrowserRouter>
  );
};

export default RouteSwitch;
