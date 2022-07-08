import { useLinks } from "../context/LinksContext";
import LinkForm from "./LinkForm";

const Links = () => {
  const { links } = useLinks();

  return links && links.map((link) => <LinkForm key={link.id} link={link} />);
};

export default Links;
