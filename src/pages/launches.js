import React from "react";
import {
  Box,
  SimpleGrid,
  Flex
} from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "../components/error";
import Breadcrumbs from "../components/breadcrumbs";
import LoadMoreButton from "../components/load-more-button";
import LaunchCard from '../components/card-launch';
import { useStateValue } from '../contexts/app-context';
import FavouritesDrawer from '../components/favourites-drawer';

const PAGE_SIZE = 12;

export default function Launches() {
  const { launchIsFavourite, handleFavouriteLaunch } = useStateValue();
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  console.log(data, error);

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
          <FavouritesDrawer />
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
    </div>
  );
}
