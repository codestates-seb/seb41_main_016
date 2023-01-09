package com.mainproject.domain.reservation.repository;

import com.mainproject.domain.reservation.entity.Reservation;
import com.mainproject.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findByRoom(Long roomId);
}
