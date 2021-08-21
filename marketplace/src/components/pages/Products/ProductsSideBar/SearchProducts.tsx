import { BsSearch } from "react-icons/bs";

export default function () {
  return (
    <div className="sidebar-item">
      <h3 className="sidebar-title">Cauta produse</h3>
      <form>
        <input type="text" placeholder="Cauta produse..." />
        <button>
          <BsSearch />
        </button>
      </form>
    </div>
  );
}
