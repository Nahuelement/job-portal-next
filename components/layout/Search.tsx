import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";






const Search = () => {


    const [keyword, setKeyword] = useState('')
    const [location, setLocation] = useState('')

    const router = useRouter()

    const submitHandler = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        if (keyword) {
          let searchQuery = `/?keyword=${keyword}`;
          if (location) searchQuery = searchQuery.concat(`&location=${location}`);

          router.push(searchQuery);
        } else {
          router.push("/");
        }
      };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/job-search.svg" alt="search"  layout="fill"/>
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> Buscar</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Enter Your Keyword"
                    value = {keyword}
                    onChange={(({target})=> setKeyword(target.value))}
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-industry"></i>
                  <input
                    type="text"
                    placeholder="Enter City, State ..."
                    value = {location}
                    onChange = {({target})=> setLocation(target.value)}

                  />
                </div>
              </div>
              <div className="searchButtonWrapper">
                <button type="submit" className="searchButton">
                  Byscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
