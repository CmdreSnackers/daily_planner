import PlanCard from "../../components/PlanCard";

export default function Details(props) {
  const { plan = {} } = props;
  return (
    <>
      <PlanCard plan={plan} type="details" />
    </>
  );
}
