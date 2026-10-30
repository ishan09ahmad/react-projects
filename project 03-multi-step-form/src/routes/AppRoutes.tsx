import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Info from "../pages/Info";
import Plan from "../pages/Plan";
import AddOns from "../pages/AddOns";
import Summary from "../pages/Summary";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Info />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/add-ons" element={<AddOns />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
