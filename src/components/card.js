import React from 'react';
import { Link } from "react-router-dom";
import {
  Badge,
  Box,
  Image,
} from "@chakra-ui/core";
import { Star } from "react-feather";

export default function Card({
  title,
  subtitle,
  url,
  image,
  patch,
  imageAlt,
  badge,
  badgeColor,
  toggleFavourite,
  isFavourite,
  size = "regular",
  children,
}) {
  return (
    <Box
      as={Link}
      to={url}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      display="block"
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          height={size === "small" ? ["120px"] : ["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />
      )}
      {patch
        && <Image
          position="absolute"
          top="5"
          right="5"
          src={patch}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />
      }

      <Box px="6" pt={toggleFavourite ? "8" : "6"} pb="6" position="relative">
        {toggleFavourite && <Box
          as="button"
          onClick={toggleFavourite}
          color={isFavourite ? "yellow.400" : "gray.200"}
          position="absolute"
          top="2"
          right="2"
        >
          <Star />
        </Box>}
        <Box d="flex" alignItems="baseline">
          <Badge px="2" variant="solid" variantColor={badgeColor}>
            {badge}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {subtitle}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
