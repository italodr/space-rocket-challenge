import React, { useRef } from "react";
import { Star } from 'react-feather';
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { useStateValue } from '../contexts/app-context';
import LaunchCard from './card-launch';

export default function FavouritesDrawer() {
  const { favourites } = useStateValue();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openButtonRef = useRef();

  return (
    <>
      <Flex
        as="button"
        ref={openButtonRef}
        onClick={onOpen}
        align="center"
        justify="space-between"
      >
        <Star /> My favourites <Box fontSize={13} ml={1}>({favourites.length})</Box>
      </Flex>
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
            {favourites.length ? favourites.map((launch) => (
              <LaunchCard
                launch={launch}
                size="small"
                key={launch.flight_number}
              />
            )) : (
              <Box color="gray.400" pt="10" textAlign="center">
                <Box color="gray.600" fontSize={21} mb="3">You don't have favourites launches yet.</Box>
                Click on the little stars and show us some love
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
