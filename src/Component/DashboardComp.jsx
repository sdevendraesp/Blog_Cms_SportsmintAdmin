import { useNavigate } from "react-router-dom";

export function DashboardComp(props) {
  let navigate = useNavigate();

  console.log(props.link);
  return (
    <div className="box dashBox">
      <div className="box-body">
        <div className="no-line-chart d-flex align-items-end justify-content-between py-2">
          <div>
            <p className="mb-0">
              {props.link == undefined ? (
                <h4>{props.name}</h4>
              ) : (
                <h4>
                  <h4 onClick={() => navigate(`${props.link}`)}>
                    {props.name}
                  </h4>
                </h4>
              )}
            </p>
            <p className="mb-0">
              <h5>{props.data}</h5>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
