import "./App.css";
import pokemon from "./pokemon.json";
import PropTypes from "prop-types";
import { useState } from "react";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>select</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

function App() {
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div
      style={{
        margin: "auto",
        width: 500,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search Engine</h1>
      <input value={filter} onChange={(evt) => setFilter(evt.target.value)} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 70% 30%",
          gridColumnCap: "1rem",
        }}
      >
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>Home</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => setSelectedItem(pokemon)}
                  ></PokemonRow>
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && (
          <div style={{ color: "orange" }}>
            {selectedItem && <PokemonInfo {...selectedItem} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
