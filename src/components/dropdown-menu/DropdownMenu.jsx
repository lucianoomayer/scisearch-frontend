import { useState, useRef, useEffect } from "react";
import "./DropdownMenu.css";

export default function DropdownMenu({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [anoInicial, setAnoInicial] = useState("");
  const [anoFinal, setAnoFinal] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilter = () => {
    onSelect({ anoInicial, anoFinal });
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={ref}>
      <button type="button" className="filter-button" onClick={() => setOpen(!open)}>
        Filter
      </button>

      {open && (
        <div className="dropdown-content">
          <label htmlFor="from-year">From</label>
          <input
            id="from-year"
            type="number"
            placeholder=""
            value={anoInicial}
            onChange={(e) => {setAnoInicial(e.target.value)}}
          />
          <label htmlFor="to-year">To</label>
          <input
            id="to-year"
            type="text"
            placeholder=""
            value={anoFinal}
            onChange={(e) => {setAnoFinal(e.target.value)}}
          />
          <button type="button" onClick={handleFilter}>
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
