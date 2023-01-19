package com.mainproject.domain.reservation.repository;

import com.mainproject.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findByRoom(Long roomId);

//    List<Reservation> findAllByReservation(Reservation reservation);
}
