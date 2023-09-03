import React, { useEffect } from "react";
import { FaTrash as IconTrash, FaCheck as IconCheck } from "react-icons/fa";
import { TbWorldBolt as IconWorld } from "react-icons/tb";
import { AiOutlineClear as IconClear } from "react-icons/ai";
import { useUserContext } from "../contexts/user.context";

const PreviewComponent = ({ state }) => {
  return (
    <div className="flex flex-col items-center py-10  w-full h-full rounded-xl aspect-[428/926] bg-white">
      <img
        className="w-[120px] h-[120px]"
        src={"http://localhost:8080/public/" + state.profilePicture}
      />
      <h2 className="text-[30px] mt-6 font-bowlby"> {state.fullName} </h2>
      {state.bioText && (
        <div className="flex flex-col mt-4  items-center w-full px-12 gap-2">
          <span className="self-start justify-self-start text-[8px] font-bowlby">
            {" "}
            User Biography :
          </span>
          <p className="w-full overflow-auto rounded-lg border-dotted border-[8px] box-border min-h-[40px] max-h-[100px] text-[12px] text-start p-2 text-opacity-55 text-black">
            {" "}
            {state.bioText}{" "}
          </p>
        </div>
      )}

      {state.userMessage && (
        <div className="flex flex-col mt-4  items-center w-full px-12 gap-2">
          <span className="self-start justify-self-start text-[8px] font-bowlby">
            {" "}
            User Message :
          </span>
          <p className="w-full text-start overflow-auto rounded-lg border-dotted border-[8px] box-border min-h-[40px] max-h-[100px] text-[12px] p-2 text-opacity-55 text-black">
            {" "}
            {state.userMessage}{" "}
          </p>
        </div>
      )}

      <h3 className="font-bowlby mt-10 mb-4"> Links </h3>

      {state.linkGroups.map((linkGroup, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-2 mb-4 items-center border-b-2 pb-4 w-full"
          >
            <h3 className="font-bold"> {linkGroup.title} </h3>
            {linkGroup.links.map((link, index) => {
              return (
                <a
                  key={index}
                  className="text-blue-400 hover:underline border rounded-lg px-4 py-2"
                  href={link.url}
                >
                  {" "}
                  {link.title}{" "}
                </a>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const InputTextArea = ({ title, placeholder, name, value, onChange, save }) => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-secondary rounded-2xl">
      <h1 className="text-[16px] font-bowlby text-black"> {title} </h1>
      <textarea
        onChange={onChange}
        name={name}
        value={value}
        rows="3"
        placeholder={placeholder}
        className="bg-white rounded-lg resize-none border-none outline-none p-2"
      />
      <button
        onClick={() => {
          save(name, value);
        }}
        className="rounded-lg text-green-500 bg-slate-100 min-w-6 h-6 gap-2 px-2 flex items-center justify-center"
      >
        {" "}
        Save <IconCheck />{" "}
      </button>
    </div>
  );
};

const InputLink = ({ saved = false, link, updateLink, removeLink, index }) => {
  return (
    <div className="flex gap-2 lg:flex-row flex-col">
      <input
        className="rounded-xl px-2"
        placeholder="Link Title"
        onChange={(e) => {
          updateLink(index, e.target.value, link.url);
        }}
        value={link.title}
      />
      <input
        className="rounded-xl px-2"
        placeholder="Link Url"
        value={link.url}
        onChange={(e) => {
          updateLink(index, link.title, e.target.value);
        }}
      />
      <button
        onClick={() => {
          removeLink(index);
        }}
        className="rounded-md text-white mt-3 lg:mt-0 px-4 py-1 bg-red-500 font-bold flex items-center justify-center"
      >
        {" "}
        <IconTrash /> Delete{" "}
      </button>
    </div>
  );
};

const InputLinkGroup = ({
  linkGroup,
  updateLinkGroup,
  removeLinkGroup,
  index,
}) => {
  const [text, setText] = React.useState(linkGroup.title);
  const [links, setLinks] = React.useState([...linkGroup.links]);

  const addLink = (newLink) => {
    setLinks((prev) => [...prev, newLink]);
  };

  const updateLink = (linkIndex, title, url) => {
    const newLinks = links;
    newLinks[linkIndex].title = title;
    newLinks[linkIndex].url = url;
    setLinks((prev) => [...newLinks]);
  };

  const removeLink = (linkIndex) => {
    const newLinks = links;
    newLinks.splice(linkIndex, 1);
    setLinks((prev) => [...newLinks]);
  };

  return (
    <div className="max-w-full w-full min-h-[40px] gap-6 rounded-lg px-2 py-2 bg-blue-400  flex flex-col">
      <div className="flex justify-between lg:flex-row flex-col gap-2">
        <input
          className="text-[16px] font-bowlby text-black bg-opacity-25 bg-white"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <div className="flex w-fit gap-2">
          <button
            onClick={() => {
              removeLinkGroup(index);
            }}
            className="rounded-lg text-red-500 bg-slate-100 min-w-6 h-6 gap-2 px-2 flex items-center justify-center"
          >
            {" "}
            Remove Group <IconTrash />{" "}
          </button>
          <button
            onClick={() => {
              updateLinkGroup(index, text, links);
            }}
            className="rounded-lg text-green-500 bg-slate-100 min-w-6 h-6 gap-2 px-2 flex items-center justify-center"
          >
            {" "}
            Save Group <IconCheck />{" "}
          </button>
        </div>
      </div>
      {links.map((link, index) => {
        return (
          <InputLink
            updateLink={updateLink}
            removeLink={removeLink}
            index={index}
            link={link}
            key={link._id}
          />
        );
      })}
      <button
        onClick={() => {
          addLink({
            title: "",
            url: "",
            _id: Math.random() * 1000 + "",
          });
        }}
        title="New Link"
        className="mx-auto bg-yellow-400 font-bowlby w-8 h-8 flex justify-center items-center rounded-3xl text-[24px]"
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
};

const LinkGroups = ({
  linkGroups = [],
  addLinkGroup,
  updateLinkGroup,
  removeLinkGroup,
  addLink,
  updateLink,
  removeLink,
}) => {
  return (
    <div className="w-full min-h-[40px] gap-4 rounded-lg px-2 py-2 bg-secondary flex flex-col">
      {linkGroups.map((linkGroup, index) => {
        return (
          <InputLinkGroup
            addLink={addLink}
            updateLink={updateLink}
            removeLink={removeLink}
            index={index}
            updateLinkGroup={updateLinkGroup}
            removeLinkGroup={removeLinkGroup}
            linkGroup={linkGroup}
            key={linkGroup._id}
          />
        );
      })}
      <button
        onClick={() => {
          addLinkGroup();
        }}
        title="New Link group"
        className=" mx-auto bg-blue-400 font-bowlby w-8 h-8 flex justify-center items-center rounded-3xl text-[24px]"
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default function DashboardPage() {
  const userCtx = useUserContext();

  const [state, setState] = React.useState(null);
  const [temp, setTemp] = React.useState(null);

  useEffect(() => {
    if (userCtx.user) {
      setState((prev) => ({ ...prev, ...userCtx.user }));
    }
  }, [userCtx.user]);

  useEffect(() => {
    if (state) {
      setTemp({ ...state });
    }
  }, [state, state?.linkGroups]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  };

  const setTextToState = (name, value) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const addLinkGroup = () => {
    const linkGroups = temp.linkGroups;
    linkGroups.push({
      title: "",
      links: [],
      _id: Math.random() * 1000 + "",
    });
    setTemp((prev) => ({ ...prev, linkGroups }));
  };

  const updateLinkGroup = (linkGroupIndex, title, links) => {
    const linkGroups = temp.linkGroups;
    linkGroups[linkGroupIndex].title = title;
    linkGroups[linkGroupIndex].links = links;
    setTemp((prev) => ({ ...prev, linkGroups }));
  };

  const removeLinkGroup = (linkGroupIndex) => {
    const linkGroups = temp.linkGroups;
    linkGroups.splice(linkGroupIndex, 1);
    setTemp((prev) => ({ ...prev, linkGroups }));
  };

  return state && temp ? (
    <div className="w-full min-h-[500px] bg-quinary rounded-lg gap-8 p-4 my-2 flex flex-col lg:flex-row lg:items-start items-center">
      <div className="bg-quaternary gap-4 flex flex-col rounded-2xl mt-14 p-4 min-w-[60%] w-full lg:w-auto min-h-[300px] h-full">
        <div className="flex self-end gap-3">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="rounded-lg text-primary w-fit self-end bg-slate-100 min-w-6 h-6 gap-2 px-4 py-2 flex items-center justify-center"
          >
            {" "}
            Clear <IconClear />{" "}
          </button>
          <button className="rounded-lg text-primary w-fit self-end bg-slate-100 min-w-6 h-6 gap-2 px-4 py-2 flex items-center justify-center">
            {" "}
            Publish <IconWorld />{" "}
          </button>
        </div>
        <InputTextArea
          save={setTextToState}
          onChange={handleChange}
          value={temp.bioText}
          name="bioText"
          title="Type Your Bio Text"
          placeholder="I'm from Berlin and I'm a student..."
        />
        <InputTextArea
          save={setTextToState}
          onChange={handleChange}
          value={temp.userMessage}
          name="userMessage"
          title="Type a message for visitors"
          placeholder="Please follow my social accounts..."
        />
        <LinkGroups
          addLinkGroup={addLinkGroup}
          updateLinkGroup={updateLinkGroup}
          removeLinkGroup={removeLinkGroup}
          linkGroups={temp.linkGroups}
        />
      </div>
      <div className="flex-[auto] flex flex-col items-center gap-2 justify-start w-full lg:w-auto h-full p-5">
        <h4 className="font-bowlby"> Preview </h4>
        <PreviewComponent state={state} />
      </div>
    </div>
  ) : (
    <></>
  );
}
