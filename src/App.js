import Home from "./routes/Home/Home.component";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.component";
import Signin from "./routes/Sign-in/Signin.component"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<Signin />} />
      </Route>
    </Routes>
  )
}


function Shop() {
  return <h1>Hello World</h1>
}
export default App;

