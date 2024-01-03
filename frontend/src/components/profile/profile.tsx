import {
  Button,
  Card,
  CardContent,
  Modal,
  Paper,
  Stack,
  TextField,
  styled,
} from "@suid/material";
import { createSignal, onCleanup } from "solid-js";
import { PutUser } from "../../services/user";
import BasicAppBar from "../navbar home/navbarHome";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.palette.text.secondary,
  background: "rgba(200, 200, 200, 0.1)",
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SquareButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const CenteredModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Profile = () => {
  const [userData, setUserData] = createSignal({
    email: "user@example.com",
    password: "********",
    phoneNumber: "+1234567890",
    name: "John Doe",
    profileImageURL: "https://mui.com/static/images/avatar/1.jpg",
  });

  const userDetails = [
    { label: "Name", value: userData().name },
    { label: "Email", value: userData().email },
    { label: "Password", value: userData().password },
    { label: "Phone Number", value: userData().phoneNumber },
  ];

  const [editModalOpen, setEditModalOpen] = createSignal(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveChanges = () => {
    PutUser({
      _id: "user_id",
    email: userData().email,
    phone: userData().phoneNumber,
    name: userData().name,
    profileB64: "1111",
    });
    closeEditModal();
  };

  onCleanup(() => {
    setUserData({
      email: "",
      password: "",
      phoneNumber: "",
      name: "",
      profileImageURL: "",
    });
  });

  return (
      <>
        <BasicAppBar />
  
        <div style="padding: 20px; display: flex; justify-content: space-between;">
          {/* Profile Image */}
          <div>
            <img
              src={userData().profileImageURL}
              alt="Profile"
              style="width: 400px; height: auto;"
            />
          </div>
  
          <div style="width: 300px; height: auto;">
            <ButtonContainer>
              <SquareButton
                variant="contained"
                color="primary"
                onClick={openEditModal}
                class = "bg-burnt-sienna"
              >
                EDIT
              </SquareButton>
            </ButtonContainer>
          </div>
        </div>
  
        {/* User Details */}
        <Stack spacing={2}>
          {userDetails.map((detail, index) => (
            <Item key={index} style="padding: 30px;" >
              <div>
                <strong>{detail.label}:</strong>
                <strong>               </strong>
                <strong>{detail.value}</strong>
              </div>
              <div>
                 
              </div>
            </Item>
          ))}
        </Stack>
  
        {/* Edit Modal */}
        <CenteredModal open={editModalOpen()} onClose={closeEditModal}>
          <Card>
            <CardContent>
              <h2>Edit Your Info Below</h2>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={userData().name}
                onChange={(e) =>
                  setUserData({ ...userData(), name: e.target.value })
                }
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={userData().email}
                onChange={(e) =>
                  setUserData({ ...userData(), email: e.target.value })
                }
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={userData().password}
                onChange={(e) =>
                  setUserData({ ...userData(), password: e.target.value })
                }
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                variant="outlined"
                value={userData().phoneNumber}
                onChange={(e) =>
                  setUserData({ ...userData(), phoneNumber: e.target.value })
                }
              />
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                class = "fill-burnt-sienna"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </CenteredModal>

        <Button size="large" 
        >
          Add Items [Suppliers]
        </Button>
      </>
    );
  };
  
  export default Profile;