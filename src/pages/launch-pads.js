import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/core";

import Error from "../components/error";
import Breadcrumbs from "../components/breadcrumbs";
import LoadMoreButton from "../components/load-more-button";
import Card from '../components/card';
import { useSpaceXPaginated } from "../utils/use-space-x";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <Card
                url={`/launch-pads/${launchPad.site_id}`}
                title={launchPad.name}
                subtitle={`${launchPad.attempted_launches} attempted · ${launchPad.successful_launches} succeeded`}
                badge={launchPad.status === "active" ? 'Active' : 'Retired'}
                badgeColor={launchPad.status === "active" ? 'green' : 'red'}
                key={launchPad.site_id}
              >
                <Text color="gray.500" fontSize="sm">
                  {launchPad.vehicles_launched.join(", ")}
                </Text>
              </Card>
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
