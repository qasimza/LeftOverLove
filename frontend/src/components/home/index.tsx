import { For, createSignal, onCleanup } from "solid-js";
import BasicAppBar from "../navbar home/navbarHome";
import QRCodeGenerator from "../qrGen/qr";
import {
  Stack,
  Typography,
  Paper,
  styled,
  Button,
  Box,
  Grid,
  Modal,
} from "@suid/material";
import { useAuth0 } from "@rturnq/solid-auth0";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: theme.palette.text.secondary,
  background: "rgba(200, 200, 200, 0.1)",
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SquareButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const Dashboard = () => {
  const [data, setData] = createSignal<
    { id: number; name: string; description: string; image: string }[]
  >([]);

  const [modalOpen, setModalOpen] = createSignal(false);
  const [selectedItemId, setSelectedItemId] = createSignal<number>(0);

  const fetchedData = [
    { id: 1, name: 'Item 1', description: 'Description 1', image: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg' },
    { id: 2, name: 'Item 2', description: 'Description 2', image: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg' },
    { id: 3, name: 'Item 3', description: 'Description 3', image: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg' },
    { id: 4, name: 'Item 4', description: 'Description 4', image: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg' },
    { id: 5, name: 'Item 5', description: 'Description 5', image: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg' },
    // Add more items as needed
  ];

  // // Fetcher
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://ec2-18-191-249-131.us-east-2.compute.amazonaws.com/"); // Replace with API endpoint
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // // OG Fetch
  // onCleanup(() => {
  //   fetchData();
  // });

  setData(fetchedData);

  const openModal = (itemId: number) => {
    setSelectedItemId(itemId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItemId(0);
    setModalOpen(false);
  };

  return (
    <>
      <BasicAppBar />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" class="mb-3">
          Food Near You <em style={{ position: "absolute", right: "10%" }}>Servings Left:</em>
          {/* Add user.servingsLeft */}
        </Typography>
        <Stack spacing={2}>
          <For each={data()}>
            {(item) => (
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%"}}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography>{item.description}</Typography>
                  </Item>
                </Grid>
                <Grid item xs={12} md={3}>
                  <ButtonContainer>
                    <SquareButton
                      variant="contained"
                      color="primary"
                      onClick={() => openModal(item.id)}
                    >
                      Gimme Gimme!
                    </SquareButton>
                  </ButtonContainer>
                </Grid>
              </Grid>
            )}
          </For>
        </Stack>
      </div>

      <Modal open={modalOpen()} onClose={closeModal}>
        <Box sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}>
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "15px",
              right: "25px",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              height: '7rem',
              width: '7rem',
            }}
          >
            <Typography sx={{ fontSize: '7rem', color: "white" }}>X</Typography>
          </button>
          {typeof selectedItemId() === "number" ? (
            <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
              <QRCodeGenerator value={selectedItemId()} />
            </Box>
          ) : null}
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
