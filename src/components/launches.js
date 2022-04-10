import React, { useRef } from "react";
import {
  Badge,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Image,
  SimpleGrid,
  Text,
  Flex
} from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { useLocalStorage } from "../utils/use-localstorage";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import IconStar from './icon-star';

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

  const handleFavouriteLaunch = (launch) => {
    if (launchIsFavourite(launch)) {
      const filteredFavourites = favourites.filter(item => item.flight_number !== launch.flight_number);
      setFavourites(filteredFavourites);
    } else {
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
            <IconStar /> Show favourites ({favourites.length})
          </Flex>
        </Box>
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem
                launch={launch}
                isFavourite={launchIsFavourite(launch)}
                toggleFavourite={(event) => {
                  event.preventDefault();
                  handleFavouriteLaunch(launch)
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
        {favourites.map((launch) => (
          <LaunchItem
            launch={launch}
            isFavourite={true}
            toggleFavourite={(event) => {
              event.preventDefault();
              handleFavouriteLaunch(launch)
            }}
            key={launch.flight_number}
          />
        ))}
      </FavouritesDrawer>
    </div>
  );
}

export function LaunchItem({ launch, toggleFavourite, isFavourite }) {
  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box px="6" pt="8" pb="6" position="relative">
        <Box
          as="button"
          onClick={toggleFavourite}
          color={isFavourite ? "yellow.400" : "gray.200"}
          position="absolute"
          top="2"
          right="2"
        >
          <IconStar />
        </Box>
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" variantColor="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>
        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
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
