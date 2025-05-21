'use client';
import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
import { FIELDS } from './fields';
import { useEnumsContext } from '@/app/providers';
import { renderField } from '../renderFieldHelper';
import { useSession } from 'next-auth/react';
import { addChildToUserMutation } from '@/services/mutations';
import { graphConnect } from '@/services/hygraph.service';

const CHILD_FIELDS = [
  { name: 'names', label: 'Nombres', type: 'text' },
  { name: 'lastNames', label: 'Apellidos', type: 'text' },
  { name: 'personalId', label: 'ID personal', type: 'text' },
];

export const PersonalForm = (props: any) => {
  const enums = useEnumsContext();
  const { data } = useSession();
  const [children, setChildren] = useState(props.children || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    names: '',
    lastNames: '',
    personalId: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    names: '',
    lastNames: '',
    personalId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add child handler
  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!addForm.names || !addForm.lastNames || !addForm.personalId)
        throw new Error('Completa todos los campos.');
      if (!data?.id) throw new Error('Usuario no autenticado.');
      // Here you would call a mutation to create the child user and then link it
      // For demo, just add locally
      const newChild = {
        id: Math.random().toString(36).slice(2),
        ...addForm,
      };
      setChildren([...children, newChild]);
      setAddForm({ names: '', lastNames: '', personalId: '' });
      setShowAddForm(false);
    } catch (err: any) {
      setError(err.message || 'Error al agregar hijo.');
    } finally {
      setLoading(false);
    }
  };

  // Edit child handler
  const handleEditChild = (index: number) => {
    setEditIndex(index);
    setEditForm(children[index]);
  };
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.names || !editForm.lastNames || !editForm.personalId) {
      setError('Completa todos los campos.');
      return;
    }
    const updated = [...children];
    updated[editIndex!] = { ...updated[editIndex!], ...editForm };
    setChildren(updated);
    setEditIndex(null);
    setError(null);
  };
  // Remove child handler
  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_: any, i: number) => i !== index));
    setEditIndex(null);
  };

  return (
    <section className="border-b border-slate-500 pb-8 mb-8">
      <h3 className="ml-auto mb-6 text-3xl font-semibold text-primary-400">
        Información personal
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map((field) => renderField(field, enums))}
      </div>
      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-2">Hijos</h4>
        <ul className="mb-4">
          {children && children.length > 0 ? (
            children.map((child: any, idx: number) => (
              <li
                key={child.id}
                className="mb-2 flex items-center gap-2">
                {editIndex === idx ? (
                  <form
                    onSubmit={handleSaveEdit}
                    className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="border border-slate-500 rounded-md py-1 px-2 bg-transparent text-gray-300"
                      placeholder="Nombres"
                      value={editForm.names}
                      onChange={(e) =>
                        setEditForm({ ...editForm, names: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="border border-slate-500 rounded-md py-1 px-2 bg-transparent text-gray-300"
                      placeholder="Apellidos"
                      value={editForm.lastNames}
                      onChange={(e) =>
                        setEditForm({ ...editForm, lastNames: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="border border-slate-500 rounded-md py-1 px-2 bg-transparent text-gray-300"
                      placeholder="ID personal"
                      value={editForm.personalId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, personalId: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="bg-primary-400 text-white px-2 py-1 rounded-md">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 px-2"
                      onClick={() => setEditIndex(null)}>
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <span>
                      {child.names} {child.lastNames} (ID: {child.personalId})
                    </span>
                    <button
                      type="button"
                      className="text-blue-400 underline text-sm"
                      onClick={() => handleEditChild(idx)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="text-red-400 underline text-sm"
                      onClick={() => handleRemoveChild(idx)}>
                      Eliminar
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No hay hijos registrados.</li>
          )}
        </ul>
        {showAddForm ? (
          <form
            onSubmit={handleAddChild}
            className="flex gap-2 items-center mb-2">
            <input
              type="text"
              className="border border-slate-500 rounded-md py-1 px-2 bg-transparent text-gray-300"
              placeholder="Nombres"
              value={addForm.names}
              onChange={(e) =>
                setAddForm({ ...addForm, names: e.target.value })
              }
              disabled={loading}
            />
            <input
              type="text"
              className="border border-slate-500 rounded-md py-1 px-2 bg-transparent text-gray-300"
              placeholder="Apellidos"
              value={addForm.lastNames}
              onChange={(e) =>
                setAddForm({ ...addForm, lastNames: e.target.value })
              }
              disabled={loading}
            />
            <input
              type="text"
              className="border border-slate-500 rounded-md py-1 px-2 bg-transparent text-gray-300"
              placeholder="ID personal"
              value={addForm.personalId}
              onChange={(e) =>
                setAddForm({ ...addForm, personalId: e.target.value })
              }
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-primary-400 text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={loading}>
              {loading ? 'Agregando...' : 'Agregar'}
            </button>
            <button
              type="button"
              className="text-gray-400 px-2"
              onClick={() => {
                setShowAddForm(false);
                setAddForm({ names: '', lastNames: '', personalId: '' });
              }}>
              Cancelar
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="bg-primary-400 text-white px-4 py-2 rounded-md"
            onClick={() => setShowAddForm(true)}>
            Agregar hijo
          </button>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </section>
  );
};
