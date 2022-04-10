import React, { useRef } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  SimpleGrid,
  Flex
} from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { useLocalStorage } from "../utils/use-localstorage";
import { showParticles } from "../utils/particles";
import Error from "../components/error";
import Breadcrumbs from "../components/breadcrumbs";
import LoadMoreButton from "../components/load-more-button";
import IconStar from '../components/icon-star';
import LaunchCard from '../components/card-launch';

const PAGE_SIZE = 12;

export default function Launches() {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  console.log(data, error);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openButtonRef = useRef();

  const launchIsFavourite = (launch) => favourites.find(item => item.flight_number === launch.flight_number);

  const handleFavouriteLaunch = (event, launch) => {
    event.preventDefault();

    if (launchIsFavourite(launch)) {
      const filteredFavourites = favourites.filter(item => item.flight_number !== launch.flight_number);
      setFavourites(filteredFavourites);
    } else {
      showParticles(event);
      setFavourites([...favourites, launch]);
    }
  };

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <Flex
        align="center"
        justify="space-between"
        px="6"
      >
        <Box>
          <Flex
            as="button"
            ref={openButtonRef}
            onClick={onOpen}
            align="center"
            justify="space-between"
          >
            <IconStar /> My favourites <Box fontSize={13} ml={1}>({favourites.length})</Box>
          </Flex>
        </Box>
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchCard
                launch={launch}
                isFavourite={launchIsFavourite(launch)}
                toggleFavourite={(event) => {
                  handleFavouriteLaunch(event, launch)
                }}
                key={launch.flight_number}
              />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
      <FavouritesDrawer
        openButtonRef={openButtonRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        {favourites.length ? favourites.map((launch) => (
          <LaunchCard
            launch={launch}
            isFavourite={true}
            toggleFavourite={(event) => {
              handleFavouriteLaunch(event, launch)
            }}
            size="small"
            key={launch.flight_number}
          />
        )) : (
          <Box color="gray.400" pt="10" textAlign="center">
            <Box color="gray.600" fontSize={21} mb="3">You don't have favourites launches yet.</Box>
            Click on the little stars and show us some love
          </Box>
        )}
      </FavouritesDrawer>
    </div>
  );
}

export function FavouritesDrawer({ openButtonRef, isOpen, onClose, children }) {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={openButtonRef}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent overflow="auto">
        <DrawerCloseButton />
        <DrawerHeader>
          Favourites
        </DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
