import { useContext, useState, useEffect } from "react";
import { SettingContext } from "../../context/SettingContextProvider";
import { useParams, Link } from "react-router-dom";
import Moment from "react-moment";
import { AuthContext } from "../../context/AuthContextProvider";

const ListChapter = ({
  callApi,
  dataChapter,
  keyword,
  setKeyword,
  orderby,
  setOrderby,
  loader,
  setCheckKeywordOrderby,
  checkKeywordOrderby,
}: any) => {
  const { togglePopup }: any = useContext(SettingContext);
  const { user, loaderUser }: any = useContext(AuthContext);

  const [checkSearchChapter, setCheckSearchChapter] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (togglePopup && checkKeywordOrderby) {
      if (user) {
        callApi(user.user.id, 1);
      } else {
        if (loaderUser !== "loader") {
          callApi("", 1);
        }
      }
    }
  }, [keyword, togglePopup]);

  useEffect(() => {
    if (togglePopup && checkKeywordOrderby) {
      if (user) {
        callApi(user.user.id, 1);
      } else {
        if (loaderUser !== "loader") {
          callApi("", 1);
        }
      }
    }
  }, [orderby, togglePopup]);

  const changePageChapter = (word: string) => {
    if (word === "next") {
      if (user) {
        callApi(user.user.id, dataChapter.allChapter.current_page + 1);
      } else {
        if (loaderUser !== "loader") {
          callApi("", dataChapter.allChapter.current_page + 1);
        }
      }
    } else {
      if (user) {
        callApi(user.user.id, dataChapter.allChapter.current_page - 1);
      } else {
        if (loaderUser !== "loader") {
          callApi("", dataChapter.allChapter.current_page - 1);
        }
      }
    }
  };

  return (
    <>
      {!loader && (
        <div
          className="popup__list__container"
          style={{
            left: `${togglePopup ? "0" : "-500"}px`,
          }}
        >
          <div style={{ position: "relative" }}>
            <div className="header__list">
              <div className="list">
                <span>Danh s??ch ch????ng</span>
              </div>
              <div className="sort__search">
                {orderby === "asc" ? (
                  <button
                    onClick={() => {
                      setOrderby("desc");
                      !checkKeywordOrderby && setCheckKeywordOrderby(true);
                    }}
                  >
                    <i className="fa-solid fa-arrow-up-9-1"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setOrderby("asc");
                      !checkKeywordOrderby && setCheckKeywordOrderby(true);
                    }}
                  >
                    <i className="fa-solid fa-arrow-down-1-9"></i>
                  </button>
                )}
                <div className="search">
                  <div
                    className={`search__container ${
                      checkSearchChapter ? "search__chapter--active" : ""
                    }`}
                  >
                    <div className="search__icon">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      className="search-input"
                      type="text"
                      placeholder="T??m theo s??? ch????ng, t??n ch????ng..."
                      onClick={() => setCheckSearchChapter(!checkSearchChapter)}
                      onBlur={() => setCheckSearchChapter(false)}
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        !checkKeywordOrderby && setCheckKeywordOrderby(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="main__list">
              {dataChapter.allChapter.data.map((item: any) => {
                return (
                  <Link
                    to={`/${params.slugstory}/${item.slug}`}
                    className={`main__item ${
                      params.slugchapter === item.slug ? "active" : ""
                    }`}
                    key={item.id}
                  >
                    <div className="item__name__number">
                      <span className="number">{item.chapter_number}.</span>
                      <span>
                        {" "}
                        {item.name_chapter.length > 17
                          ? item.name_chapter.slice(0, 14) + "..."
                          : item.name_chapter}
                      </span>
                    </div>
                    <i>
                      <span>C???p nh???t: </span>
                      <span>
                        <Moment fromNow locale="vi">
                          {item.created_at}
                        </Moment>
                      </span>
                    </i>
                    {item.bought && (
                      <div className="bought">
                        <i className="fa-solid fa-lock-open"></i>
                      </div>
                    )}
                    {!item.bought && item.coin > 0 && (
                      <span className="money">{item.coin} xu </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="footer__list">
              <div className="next__prev">
                <button
                  className={`footer__list--prev ${
                    dataChapter.allChapter.current_page === 1 ? "forbidden" : ""
                  }`}
                  onClick={() =>
                    dataChapter.allChapter.current_page > 1 &&
                    changePageChapter("prev")
                  }
                >
                  Trang tr?????c
                </button>
                <button
                  className={`footer__list--next ${
                    dataChapter.allChapter.current_page ===
                    dataChapter.allChapter.last_page
                      ? "forbidden"
                      : ""
                  }`}
                  onClick={() =>
                    dataChapter.allChapter.current_page !==
                      dataChapter.allChapter.last_page &&
                    changePageChapter("next")
                  }
                >
                  Trang sau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListChapter;
