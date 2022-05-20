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
    {
      id: 5,
      title: "Gibson Les Paul",
      brand: "Gibson",
      model: "Les Paul",
      colour: "Cherry Sunburst",
      price: 1999,
      description: `This Gibson Les Paul Standard 50s, Heritage Cherry Sunburst, has light and short surface scratches on the bottom of the neck, next to the 2nd and 3rd frets. This item has been quality checked by one of our team of repair technicians to ensure that it meets a high playing standard.

      The product photographed is the individual item that will be received.
      Live the Les Paul life. Once you've got a Gibson Les Paul Standard '50s, your life will be complete. It offers the sought-after sound of the classic Les Pauls of the 1950s, giving you the perfect vintage tone and a dreamy performance. An icon of guitar design, and one of the most celebrated models of all time, the Les Paul Standard will give you goosebumps as your hand feels every fine contour. From the likes of Slash to Bob Marley, this guitar has made its way through multiple generations and legendary players to reach the modern era, where it awaits you.
      
      
      Pure tone, prime playability. Two classic Burstbucker humbuckers adorn this feisty '50s guitar, giving it that vibrant vintage crunch which sails through to your soul. Your licks will sing powerfully as you strum and pick your way through songs, with each note shining with crystalline clarity. The beautiful neck and fretboard bring you the ultimate playing satisfaction, feeling chunky and dense whilst offering beautiful resonance. There's nothing else quite like it.
      
      Ex-Demo: This product may be ex-display, have light signs of use, have slight cosmetic marks or may have non-essential parts or software missing. The original box, packaging or manual may not be included. Each item is checked by our team of repair technicians to ensure it meets our high standards. This is a great opportunity to buy a fully functioning product at a discounted price.`,
      img: "https://cdn.mos.cms.futurecdn.net/ZqHr8hYM6DCV7G7s6kzjq6-1200-80.jpg",
    },
    {
      id: 6,
      title: "PRS Silver Sky",
      brand: "PRS",
      model: "PRS John Mayer Silver Sky",
      colour: "Grey",
      price: 2695,
      description: `The PRS Silver Sky is an idealized version of a vintage single-coil guitar where every detail adds up and sets this guitar apart from the pack and the past. The result of a close collaboration between Grammy Award-winning musician John Mayer and Paul Reed Smith, the Silver Sky is based off of years of development. Incorporating Mayer and Smith’s favorite elements of 1963 and 1964 instruments with an eye toward modern references, the PRS Silver Sky delivers the warmth and familiarity of an old guitar with the finesse of a brand-new instrument.

      Some of the more distinctive specifications include, the headstock shape, tuners, bridge, pickups, and neck and fretboard options. The headstock shape is based on PRS’s trademark design, but inverted both to accommodate Mayer’s playing style and also to keep a consistent length of string behind the nut, which makes staying in tune easier. The tuners are a traditional vintage-style, closed-back tuner, but with PRS’s locking design. The steel tremolo takes the patented PRS design and incorporates Gen III knife-edge screws. Setup flush to the body in the neutral position so that the tremolo bridge only goes down in pitch, the bridge’s increased contact with the body allows the guitar itself to be acoustically louder, which in turn improves the signal to noise ratio of the single-coil pickups. The 635JM single-coil pickups are very round and full, with a musical high end that is never “ice-picky” or brash.
      
      The Silver Sky comes with the option of a rosewood or maple fretboard. The maple fretboard option comes with the original 635JM neck shape, while the rosewood fretboard option has been subtly modified in the shoulders to feel more “rounded” in your hand. Both neck shapes were designed by researching vintage instruments and Mayer test-driving guitars on stage to find what felt right. The fretboard radius on both options is 7.25”.
      
      Other high-quality specifications include a bone nut, a molded metal jack plate (curved to make plugging and unplugging a guitar cable hassle-free), retooled knobs, and PRS’s double action truss rod (accessible from the front of the headstock for ease of use). PRS premium gig bag included.`,
      img: "https://cdn.mos.cms.futurecdn.net/EaownLfuuzvvZMuNcQrB5G.jpg",
    },
    {
      id: 7,
      title: "Epiphone Les Paul",
      brand: "Epiphone",
      model: "Epiphone Les Paul Standard '60s",
      colour: "Bournon Sunburst",
      price: 463,
      description: `The Les Paul Standard 60s models from Epiphone’s new Inspired by Gibson Collection recreate the sound of 1960s era Les Pauls. Featuring a classic Mahogany body with a Maple cap, Grover® tuners, and powered by ProBucker™ humbuckers with CTS electronics. Epiphone’s long friendship with Mr. Les Paul began in 1940 when Les built one of the world’s first solid body electric guitars while working nights at the original Epiphone factory in Manhattan. Les’ first solidbody guitar, nicknamed “the Log”, would go on to inspire the Les Paul Standard, what many consider the greatest electric guitar ever made.`,
      img: "https://www.reidys.com/images/epiphone-les-paul-standard-60s-bourbon-burst-p6999-8866_zoom.jpg",
    },
    {
      id: 8,
      title: `D'Addario Nickel Wound Guitar Strings`,
      brand: `D'Addario`,
      model: `EXL110 Nickel Guitar Strings 10-46 Regular`,
      colour: null,
      price: 6.99,
      description: `D'Addario XL Electric Guitar strings are world-renowned as "The Player's Choice" amongst guitar players of all genres and styles. XL strings are wound with nickel-plated steel and are known for their distinctive bright tone and excellent intonation. Our plus gauges offer a slight variation in a tension between gauges. These are ideal for equalizing tension between guitars of varying scale lengths or if you're looking to jump to heavier gauges in small increments. D'Addario pioneered the use of nickel-plated steel for electric guitar. Today, discerning professionals choose XLs for their distinctive bright sound and excellent intonation. D'Addario EXL's are used by artists like Kerry King ( Slayer ) / Robben Ford / Pete Yorn / Opeth / Mastadon / Pete Doherty (The Libertines) / Lenny Kravitz / John Frusciante (Red Hot Chili Peppers) / John '5' Lowery (former Marilyn Manson) / Joe Satriani / Jeff Tweedy (Wilco) / Interpol / Doves / Carlos Santana / Brad Delson ( Linkin Park ) / Beck / Larry Carlton / Mark Tremonti ( Creed / Alterbridge ).`,
      img: "https://www.woodbrass.com/images/SQUARE400/woodbrass/DADDARIO+EXL140.JPG",
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
