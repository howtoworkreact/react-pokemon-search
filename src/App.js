import "./App.css";
import pokemon from "./pokemon.json";

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

function App() {
  return (
    <div
      style={{
        margin: "auto",
        width: 500,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search Engine</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Home</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.slice(0, 20).map((pokemon) => (
            <PokemonRow pokemon={pokemon} key={pokemon.id}></PokemonRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
