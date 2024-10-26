import { Col, Row } from "react-bootstrap";
import { ShimmerThumbnail } from "react-shimmer-effects";

export const EmptyBox = ({ count, height }) => {
  return (
    <>
      <Row>
        {Array(count)
          .fill()
          .map((a, i) => (
            <Col xl={3} lg={4} md={6}>
              <section className="mt-4">
                <div className="nft_card position-relative">
                  <div className="position-relative">
                    <div className="d-flex align-items-center justify-content-between w-100 mobileCard">
                      <div className="fs-6 t-price px-0 position-relative">
                        <div className="Shimmer_box">
                          <ShimmerThumbnail height={height} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Col>
          ))}
      </Row>

    </>
  );
};
