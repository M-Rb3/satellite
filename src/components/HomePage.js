import { useState } from "react";

const HomePage = () => {
  const [earthLat, setEarthLat] = useState("");
  const [earthlon, setEarthlon] = useState("");
  const [satLon, setsatLon] = useState("");
  const [az, setAz] = useState("");
  const [el, setEl] = useState("");
  const [active, setActive] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    const B = -1 * earthlon - -1 * satLon;
    let b = Math.acos(
      Math.cos((B * Math.PI) / 180) * Math.cos((earthLat * Math.PI) / 180)
    );
    b = (b * 180) / Math.PI;

    let A = Math.asin(
      Math.sin(Math.abs((B * Math.PI) / 180)) / Math.sin((b * Math.PI) / 180)
    );
    A = (A * 180) / Math.PI;
    A = 180 - A;
    A = Number(A.toFixed(1));
    setAz(A);
    const aGeo = 42164;
    const R = 6371;
    const d = Math.sqrt(
      R * R + aGeo * aGeo - 2 * R * aGeo * Math.cos((b * Math.PI) / 180)
    );
    let res = Math.acos((aGeo / d) * Math.sin((b * Math.PI) / 180));
    res = (res * 180) / Math.PI;
    res = Math.round(res);
    setEl(res);
    setActive(true);
  };
  const validtor = (e, set) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      set(e.target.value);
    }
  };
  return (
    <div class="wrap-content">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="row-p">
          <p>Satellite Look Angle Calculator</p>
        </div>
        <div className="row">
          <label>Earth Station Latitude</label>
          <div className="input-box">
            <input
              onChange={(e) => validtor(e, setEarthLat)}
              value={earthLat}
              type="text"
              required
            />
            <span>Degrees</span>
          </div>
        </div>
        <div className="row">
          <label>Earth Station Longitude</label>
          <div className="input-box">
            <input
              onChange={(e) => validtor(e, setEarthlon)}
              value={earthlon}
              type="text"
              required
            />
            <span>Degrees</span>
          </div>
        </div>
        <div className="row">
          <label>Satellite Longitude</label>
          <div className="input-box">
            <input
              onChange={(e) => validtor(e, setsatLon)}
              value={satLon}
              type="text"
              required
            />
            <span>Degrees</span>
          </div>
        </div>
        <div className="row">
          <input className="submit" type="submit" value=" " />
        </div>
        {active && (
          <div className="results">
            <div className="row">
              <label>Elevation Angle</label>
              <div className="input-box">
                <input value={el} disabled type="text" />
                <span>Degrees</span>
              </div>
            </div>
            <div className="row">
              <label>Azimuth Angle</label>
              <div className="input-box">
                <input disabled value={az} type="text" />
                <span>Degrees</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default HomePage;
