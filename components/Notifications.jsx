import { useState, useEffect, useRef, Fragment } from "react";
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoNotificationsOffCircle } from 'react-icons/io5'
import { Transition } from '@tailwindui/react'
import { useRouter } from "next/router";

function Notifications({ notify, notifications, setNotifications }) {
  const router = useRouter()
  const { user, setLoading } = useAuth()

  const seenNotification = async (ticket_id, id, notifiers) => {
    const list = notifiers.filter(note => note !== user.id)
    const { data, error } = await supabase
      .from("notifications")
      .update({ notifiers: list })
      .match({ id: id })
    router.push(`/tickets/${ticket_id}`)
    setLoading(true)
  }

  return (
    <>
      {notifications && notifications.length > 0 && (
        <span className="w-3 h-3 p-2 right-0 top-0  bg-[#CA3011] text-xs text-white rounded-full absolute flex justify-center items-center">
          {notifications.length}
        </span>
      )}
      <IoMdNotificationsOutline size={25} />

      <Transition
          show={notify && notifications.length > 0}
          enter="transition ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div className="absolute top-[50px] right-0 w-96 h-[500px] overflow-hidden shadow-md pt-4 pb-1 bg-white rounded flex flex-col">
          <div className="flex flex-col px-2 border-b-2 pt-2">
            <div className="flex w-full justify-between mb-3 items-end px-2 pt-2">
              <h1 className="font-bold text-lg">Notifications</h1>
              <p className="underline text-xs font-bold">Make all as read</p>
            </div>
            <ul className="flex justify-between px-5">
              <li className="font-bold border-b-2 border-black">All <span className="bg-black text-white text-xs px-2 rounded font-medium">{notifications.length}</span></li>
            </ul>
          </div>
          <div className="overflow-y-scroll flex-grow">
            {notifications.map((notification, index) => (
              <Fragment key={index}>
                <div className="grid grid-cols-5 gap-2 my-2 px-2 hover:bg-gray-100"
                  onClick={() => seenNotification(notification.ticket_id, notification.id, notification.notifiers)}
                >
                  <div className="col-span-1 flex items-center justify-center h-16">
                    <span className="w-12 h-12 rounded-full flex justify-center items-center font-bold bg-orange-300">{notification.actor[0].toUpperCase()}</span>
                  </div>
                  <div className="col-span-4">
                    <h1><span className="font-bold">{notification.actor}</span> {notification.notification}</h1>
                    <p className="text-gray-500 text-sm">{notification.description}</p>
                  </div>
                </div>
                {notifications.length !== (index + 1) && <hr />}
              </Fragment>
            ))}
          </div>
        </div>
      </Transition>
      <Transition
          show={notify && notifications.length === 0}
          enter="transition ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-[50px] right-0 w-96 h-[500px] shadow p-4 bg-white flex justify-center items-center flex-col gap-3">
          <i className="text-gray-400">
            <IoNotificationsOffCircle size={45} />
          </i>
          <p>No new Notifications</p>
        </div>
        </Transition>
    </>
  );
}

export default Notifications;
