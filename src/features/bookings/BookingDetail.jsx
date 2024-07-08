import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiTrash } from "react-icons/hi";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking = {}, isLoadingBooking } = useBooking();
  const { id: bookingId, status } = booking;
  const { checkout, isCheckingOutLoading } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoadingBooking) return <Spinner />;

  if (!bookingId) return <Empty resource="booking" />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            icon={<HiArrowDownOnSquare />}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" ? (
          <Button
            onClick={() => checkout({ bookingId })}
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOutLoading}
          >
            Check out
          </Button>
        ) : null}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button
              icon={<HiTrash />}
              disabled={isDeletingBooking}
              variation="danger"
            >
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => {
                    navigate(-1);
                  },
                })
              }
              resourceName="bookings"
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
