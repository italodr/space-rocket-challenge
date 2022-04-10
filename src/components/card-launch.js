import React from 'react';
import { format as timeAgo } from "timeago.js";
import {
  Text,
  Flex
} from "@chakra-ui/core";

import Card from './card';
import { formatDate } from "../utils/format-date";

export default function LaunchCard({ launch, ...props }) {
  return (
    <Card
      title={launch.mission_name}
      subtitle={`${launch.rocket.rocket_name} · ${launch.launch_site.site_name}`}
      url={`/launches/${launch.flight_number.toString()}`}
      image={launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ?? launch.links.mission_patch_small}
      imageAlt={`${launch.mission_name} launch`}
      badge={launch.launch_success ? "Successful" : "Failed"}
      badgeColor={launch.launch_success ? "green" : "red"}
      {...props}
      key={launch.flight_number}
    >
      <Flex>
        <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
        <Text color="gray.500" ml="2" fontSize="sm">
          {timeAgo(launch.launch_date_utc)}
        </Text>
      </Flex>
    </Card>
  );
}
