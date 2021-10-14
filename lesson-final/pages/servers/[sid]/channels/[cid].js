import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Icons from "../../../../components/icons";
// import Message from "../../../../components/message";
import { data } from "../../../../data";

export default function Server() {
  let router = useRouter();
  let [closedCategories, setClosedCategories] = useState([]);
  let channel = data[`${router.query.sid}`].categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => +channel.id === +router.query.cid);

  function toggleCategory(categoryId) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    );
  }

  return (
    <>
      <div className="flex flex-col bg-gray-800 w-60">
        <button className="flex items-center h-12 px-4 font-semibold text-white shadow-sm font-title text-[15px] hover:bg-gray-550/[0.16] transition">
          <div className="relative w-4 h-4 mr-1">
            <Icons.Verified className="absolute w-4 h-4 text-gray-550" />
            <Icons.Check className="absolute w-4 h-4" />
          </div>
          Tailwind CSS
          <Icons.Chevron className="w-[18px] h-[18px] ml-auto opacity-80" />
        </button>

        <div className="flex-1 overflow-y-scroll font-medium text-gray-300 pt-3 space-y-[21px]">
          {data[router.query.sid]?.categories.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center px-0.5 text-xs uppercase font-title tracking-wide hover:text-gray-100 w-full"
                >
                  <Icons.Arrow
                    className={`${
                      closedCategories.includes(category.id) ? "-rotate-90" : ""
                    } w-3 h-3 mr-0.5 transition duration-200`}
                  />
                  {category.label}
                </button>
              )}

              <div className="space-y-0.5 mt-[5px]">
                {category.channels
                  .filter((channel) => {
                    let categoryIsOpen = !closedCategories.includes(
                      category.id
                    );

                    return categoryIsOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink channel={channel} key={channel.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 flex-shrink min-w-0 bg-gray-700">
        <div className="flex items-center h-12 px-2 shadow-sm">
          <div className="flex items-center flex-shrink-0">
            <Icons.Hashtag className="w-6 h-6 mx-2 font-semibold text-gray-400" />
            <span className="mr-2 text-white font-title">{channel.label}</span>
          </div>
          {channel.description && (
            <>
              <div className="flex-shrink-0 w-px h-6 bg-white/[.06] mx-2"></div>
              <div className="flex-shrink ml-2 text-sm font-medium text-gray-200 truncate">
                {channel.description}
              </div>
            </>
          )}
          <div className="flex items-center ml-auto">
            <Icons.HashtagWithSpeechBubble className="w-6 h-6 mx-2 text-gray-200" />
            <Icons.Bell className="w-6 h-6 mx-2 text-gray-200" />
            <Icons.Pin className="w-6 h-6 mx-2 text-gray-200" />
            <Icons.People className="w-6 h-6 mx-2 text-gray-200" />
            <div className="relative mx-2">
              <input
                className="h-6 px-1.5 text-sm font-medium placeholder-gray-400 bg-gray-900 border-none rounded w-36"
                type="text"
                placeholder="Search"
              />
              <div className="absolute inset-y-0 flex items-center right-1.5">
                <Icons.Hourglass className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <Icons.Inbox className="w-6 h-6 mx-2 text-gray-200" />
            <Icons.QuestionCircle className="w-6 h-6 mx-2 text-gray-200" />
          </div>
        </div>

        <div className="flex-1 py-2 pr-12 overflow-y-scroll">
          {channel.messages?.map((message, i) =>
            channel.messages[i - 1]?.user !== message.user ? (
              <MessageWithUser message={message} />
            ) : (
              <Message message={message} />
            )
          )}
        </div>
      </div>
    </>
  );
}

function ChannelLink({ channel }) {
  let Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  let router = useRouter();
  let active = +channel.id === +router.query.cid;
  let state = active
    ? "active"
    : channel.unread
    ? "inactiveUnread"
    : "inactiveRead";
  let classes = {
    active: "text-white bg-gray-550/[0.32]",
    inactiveUnread:
      "text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
    inactiveRead:
      "text-gray-300 hover:text-gray-100 hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
  };

  return (
    <Link href={`/servers/${router.query.sid}/channels/${channel.id}`}>
      <a
        className={`${classes[state]} flex items-center px-2 mx-2 py-1 rounded group relative`}
      >
        {state === "inactiveUnread" && (
          <div className="absolute left-0 w-1 h-2 -ml-2 bg-white rounded-r-full"></div>
        )}
        <Icon className="w-5 h-5 mr-1.5 text-gray-400" />
        {channel.label}
        <Icons.AddPerson className="w-4 h-4 ml-auto text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
      </a>
    </Link>
  );
}

function MessageWithUser({ message }) {
  return (
    <div className="mt-[17px] flex px-4 py-0.5 hover:bg-gray-950/[.07] leading-[22px]">
      <img
        className="w-10 h-10 mr-4 rounded-full mt-0.5"
        src={message.avatarUrl}
        alt=""
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-white">{message.user}</span>
          <span className="text-xs font-medium text-gray-400">
            {message.date}
          </span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }) {
  return (
    <div className="px-4 py-0.5 hover:bg-gray-950/[.07] leading-[22px]">
      <p className="text-gray-100 pl-14">{message.text}</p>
    </div>
  );
}